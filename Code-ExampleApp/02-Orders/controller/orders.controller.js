sap.ui.define([
   "oui5lib/controller/BaseController",
   "oum/do/Loader",
   "oum/do/orders",
   "oum/do/statuses",
   "oum/lib/ui"
], function(Controller, Loader, orders, statuses, ui) {
   "use strict";

   const ordersController = Controller.extend("oum.controller.orders", {
      onInit: function() {
         this.getRouter().getRoute("ordersList").attachPatternMatched(
            this._onRouteMatched, this);

         const mediaRangeSets = sap.ui.Device.media.RANGESETS.SAP_STANDARD;
         sap.ui.Device.media.attachHandler(
            this._handleMediaWidthChanged, this, mediaRangeSets);
         this._handleMediaWidthChanged(
            sap.ui.Device.media.getCurrentRange(mediaRangeSets));
         
         const eventBus = sap.ui.getCore().getEventBus();
         eventBus.subscribe("loading", "ready", this._handleLoaded, this);

         if (statuses.isInitialized()) {
            this.setStatusesModel();
         }
         const queryForm = this.getView().byId("queryForm");
         queryForm.setModel(
            new sap.ui.model.json.JSONModel(this.getQueryData())
         );

         this.queryOrders();
      },
      _onRouteMatched: function() {
         const messagesContainer = this.getView().byId("messagesContainer");
         ui.handleMessage(messagesContainer);

         this.setHeaderTitle();
      },
      setHeaderTitle: function() {
         const pageTitle = this.getView().byId("pageTitle");
         pageTitle.setText(oui5lib.util.getI18nText("ordersPage.title"));
      },
      _handleLoaded: function(channel, event, eventData) {
         if (typeof eventData === "string") {
            switch (eventData) {
            case "orders": {
               const ordersList = this.getView().byId("ordersList");
               const model = ordersList.getModel();
               if (model === undefined) {
                  ordersList.setModel(orders.getModel());
               } else {
                  model.updateBindings();
               }
               ui.setBusy(false);
               this.setQueryText();
               break;
            }
            case "statuses":
               this.setStatusesModel();
               break;
            }
         }
      },

      queryOrders: function() {
         ui.setBusy(true);

         orders.resetData();
         Loader.queryOrders(this.getQueryData());
      },
      getQueryData: function() {
         if (this._queryData === undefined) {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 150);
            this._queryData = {
               "startDate": startDate,
               "endDate": null,
               "statuses": [  "pending", "processing", "payment_overdue" ]
            };
         }
         return this._queryData;
      },

      formatOrderDate: function(dateObject) {
         const oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: this._dateTimeDisplayPattern
         });
         return oDateFormat.format(dateObject);
      },
      
      showOrderDetails: function(oEvent) {
         const item = oEvent.getSource();
         const orderId = item.data("orderId");

         this.info("navigate to detail view of order: " + orderId);
         this.getRouter().vNavTo("order", { id: orderId });
      },


      searchOrders: function(oEvent) {
         let searchString = oEvent.getParameter("newValue");
         if (searchString.length < 3) {
            searchString = "";
         }

         const filterArray = [
            new sap.ui.model.Filter("billingName", "Contains", searchString)
         ];

         const ordersList = this.getView().byId("ordersList");
         ordersList.getBinding("items").filter(filterArray);
      },
      
      setStatusesModel: function() {
         const selectedStatuses = this.getQueryData().statuses;
         const statusData = statuses.getData();
         statusData.forEach(function(statusItem) {
            if (selectedStatuses.indexOf(statusItem.status) > -1) {
               statusItem.selected = true;
            } else {
               statusItem.selected = false;
            }
         });
         const statusList = this.getView().byId("statusList");
         statusList.setModel(statuses.getModel(), "statuses");
      },
      
      setQueryText: function() {
         const oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: this._dateDisplayPattern
         });

         const queryData = this.getQueryData();
         const startDateString = oDateFormat.format(queryData.startDate);
         let endDateString;
         if (queryData.endDate === null) {
            endDateString = oui5lib.util.getI18nText("common.now");
         } else {
            endDateString = oDateFormat.format(queryData.endDate);
         }

         let statusText = "";
         const selectedStatuses = queryData.statuses;
         for (let i = 0, s = selectedStatuses.length; i < s; i++) {
            if (i > 0) { statusText += ", "; }
            statusText +=  oui5lib.util.getI18nText("orderStatus." +
                                                    selectedStatuses[i]); 
         }
         
         const queryText = oui5lib.util.getI18nText("ordersPage.queryText",
                                                  [ startDateString, endDateString, statusText ]);
         const queryTextControl = this.getView().byId("queryText");
         queryTextControl.setText(queryText);
      },
      
      toggleQueryForm: function() {
         const button = this.getView().byId("toggleFormButton");
         
         const queryForm = this.getView().byId("queryForm");
         if (queryForm.getVisible()) {
            queryForm.setVisible(false);
            button.setIcon("sap-icon://show");
            button.setText(oui5lib.util.getI18nText("orders.queryForm.button.open"));
         } else {
            queryForm.setVisible(true);
            button.setIcon("sap-icon://hide");
            button.setText(oui5lib.util.getI18nText("orders.queryForm.button.close"));
            const page = this.getView().getContent()[0];
            page.scrollTo(0);
         }
      },
      submitQueryForm: function() {
         const statusList = this.getView().byId("statusList");
         const statusData = statusList.getModel("statuses").getData();

         const selectedStatuses = [];
         statusData.forEach(function(statusItem) {
            if (statusItem.selected) {
               selectedStatuses.push(statusItem.status);
            }
         });
         this.getQueryData().statuses = selectedStatuses;
         this.toggleQueryForm();
         this.queryOrders();
      },

      _handleMediaWidthChanged: function(mParams) {
         let style;

         switch(mParams.name) {
         case "Phone":
            style = "short";
            break;
         case "Tablet":
            style = "medium";
            break;
         default:
            style = "long";
         }
         
         this._dateTimeDisplayPattern = oui5lib.configuration
            .getDateTimeDisplayPattern("dateTime", style);
         this._dateDisplayPattern = oui5lib.configuration
            .getDateTimeDisplayPattern("date", style);

         const ordersList = this.getView().byId("ordersList");
         const model = ordersList.getModel();
         if (model !== undefined) {
            model.updateBindings(true);
         }
      }
   });
   return ordersController;
});
