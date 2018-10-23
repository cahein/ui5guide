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

         this.getRouter().getRoute("order")
            .attachPatternMatched(this._onRouteMatched, this);

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
      },
      setStatusesModel: function() {
         const statusSelect = this.getView().byId("order_status");
         statusSelect.setModel(statuses.getModel(), "statuses");
      }
   });
   return orderController;
});
