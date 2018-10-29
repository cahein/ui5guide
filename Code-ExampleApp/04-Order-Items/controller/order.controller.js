sap.ui.define([
   "oum/controller/OrderBaseController",
   "oum/do/orders",
   "oum/do/Order",
   "oum/do/products",
   "oum/do/statuses",
   "oum/lib/ui"
], function(oController, orders, Order, products, statuses, ui) {
   "use strict";

   const orderController = oController.extend("oum.controller.order", {
      onInit: function() {
         const eventBus = sap.ui.getCore().getEventBus();
         eventBus.subscribe("loading", "ready", this._handleLoaded, this);

         this.getRouter().getRoute("order").attachPatternMatched(
            this._onRouteMatched, this);

         if (statuses.isInitialized()) {
            this.setStatusesModel();
         }
      },
      _onRouteMatched: function(oEvent) {
         this.debug("order overview page");

         const messagesContainer = this.getView().byId("messagesContainer");
         ui.handleMessage(messagesContainer);

         let orderId = oEvent.getParameter("arguments").id;
         let order = null;
         if (typeof orderId === "undefined") {
            this.setEditedOrder(undefined);
            orderId = "-1";
         }
         if (orderId !== "-1") {
            this.info("edit order: " + orderId);
            order = new Order(orderId);
         }
         this.orderId = orderId;
         if (order === null || !order.isLoading()) {
            this.setOrderModels();
         }
         this.setHeaderTitle();
      },
      setHeaderTitle: function() {
         const pageTitle = this.getView().byId("pageTitle");
         pageTitle.setText(oui5lib.util.getI18nText("order.overview.pageTitle"));
      },
      
      _handleLoaded: function(channel, eventId, eventData) {
         if (typeof eventData === "object") {
            if (eventData.entity === "order" &&
                eventData.id == this.orderId) {
               this.setOrderModels();
            }
         } else {
            if (eventData === "statuses") {
               this.setStatusesModel();
            }
         }
      },
      setOrderModels: function() {
         this.prepareEditedOrder(this.orderId);
         const order = this.getEditedOrder();
         if (!(order instanceof oum.do.Order)) {
            throw new TypeError("Need an oum.do.Order to edit");
         }

         const orderForm = this.getView().byId("orderForm");
         const orderModel = orderForm.getModel("order");
         if (orderModel === undefined) {
            orderForm.setModel(order.getModel(), "order");
         } else {
            orderModel.setData(order.getData());
         }

         let editable = false;
         if (order.getProperty("status") === "new" ||
             order.getProperty("status") === "pending") {
            editable = true;
         }
         const orderStateModel = new sap.ui.model.json.JSONModel({
            editable: editable,
            statusChangeable: false,
            saved: !order.isNew()
         });
         this.getView().setModel(orderStateModel, "state");

         const orderLinesTable = this.getView().byId("orderLinesTable");
         const orderLinesModel = oui5lib.util.getJsonModelForData(order.getOrderLines());
         orderLinesTable.setModel(orderLinesModel, "orderLines");

         if (editable) {
            orderLinesTable.setMode("Delete");
         } else {
            orderLinesTable.setMode("None");
         }
      },
      setStatusesModel: function() {
         const statusSelect = this.getView().byId("order_status");
         statusSelect.setModel(statuses.getModel(), "statuses");
      },


      updateModelBindings: function() {
         const orderForm = this.getView().byId("orderForm");
         const orderModel = orderForm.getModel("order");
         orderModel.refresh();

         const orderLinesTable = this.getView().byId("orderLinesTable");
         const orderLinesModel = orderLinesTable.getModel("orderLines");
         orderLinesModel.refresh();
      },

      getLineData: function(control) {
         const bindingContext = control.getBindingContext("orderLines");
         const orderLinesModel = bindingContext.getModel("orderLines");
         return orderLinesModel.getProperty(bindingContext.getPath());
      },
      handleLineQuantityChanged: function(oEvent) {
         const input = oEvent.getSource();
         const lineData = this.getLineData(input);
         this.getEditedOrder().changeOrderLineQuantity(lineData.productId,
                                                       lineData.quantity);
         this.handleOrderChanged();
      },
      
      deleteOrderLine: function(oEvent) {
         const selectedItem = oEvent.getParameter("listItem");
         const lineData = this.getLineData(selectedItem);
         oui5lib.messages.confirmDelete(
            oui5lib.util.getI18nText("order.deleteItem.confirm"),
            this.confirmedDeleteOrderLine.bind(this, lineData.productId)
         );
      },
      confirmedDeleteOrderLine: function(productId, action) {
         if (action === "DELETE") {
            this.getEditedOrder().removeOrderLine(productId);
            this.handleOrderChanged();
         }
      },


      openProductDialog: function() {
         const selectProductDialog = sap.ui.xmlfragment("oum.fragment.SelectProductDialog", this);
         this.getView().addDependent(selectProductDialog);

         selectProductDialog.setModel(new sap.ui.model.json.JSONModel());
         selectProductDialog.open();

         this.productDialog = selectProductDialog;
      },
      queryProducts: function(oEvent) {
         const queryString = oEvent.getParameter("value");
         if (queryString.length > 2) {
            this.productDialog.setBusy(true);
            oui5lib.request.sendMappingRequest(
               "product", "queryProducts",
               { query: queryString },
               this.handleQueriedProducts.bind(this)
            );
         } else {
            this.productDialog.setNoDataText(
               oui5lib.util.getI18nText("selectDialog.minQueryLength", [ "3" ])
            );
         }
      },
      handleQueriedProducts: function(responseObject, requestProps) {
         this.productDialog.setBusy(false);

         if (responseObject.result) {
            const data = responseObject.value;

            const orderLines = this.getEditedOrder().getOrderLines();
            const productIds = [];
            orderLines.forEach(function(orderLine) {
               productIds.push(orderLine.productId);
            });
            
            const products = [];
            data.forEach(function(product) {
               if (productIds.indexOf(product.isbn) === -1) {
                  products.push(product);
               }
            });
            const model = this.productDialog.getModel();
            model.setData(products);
            if (products.length === 0) {
               this.productDialog.setNoDataText(
                  oui5lib.util.getI18nText(
                     "list.noMatchingData",
                     [ requestProps.entity, requestProps.requestParameters.query ]
                  )
               );
            }
         } else {
            this.productDialog.destroy();
            oui5lib.messages.showErrorMessage(
               oui5lib.util.getI18nText("query.result.error", [ requestProps.entity ])
            );
         }
      },
      handleProductSelected: function(oEvent) {
         const selectedItem = oEvent.getParameter("selectedItem");
         const bindingContext = selectedItem.getBindingContext();
         const productsModel = bindingContext.getModel();
         const productData = productsModel.getProperty(bindingContext.getPath());
         products.addItem(productData);
         
         this.getEditedOrder().addOrderLine(selectedItem.getTitle(), 1);
         this.handleOrderChanged();
      },
      handleOrderChanged: function() {
         this.updateModelBindings();
         this.setOrderNotSaved(true);
      }
   });
   return orderController;
});
