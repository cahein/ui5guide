sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const orderController = Controller.extend("oum.controller.order", {
      onInit: function () {
         this.getRouter().getRoute("order")
            .attachPatternMatched(this._onRouteMatched, this);
         this.getRouter().getRoute("orderProducts")
            .attachPatternMatched(this._onRouteMatched, this);
         this.getRouter().getRoute("orderAddress")
            .attachPatternMatched(this._onRouteMatched, this);
         this.getRouter().getRoute("orderAddresses")
            .attachPatternMatched(this._onRouteMatched, this);

         const model = new sap.ui.model.json.JSONModel({ history: true });
         this.getView().setModel(model);

         const page = this.getView().getContent()[0];
         if (typeof page.getFooter === "function") {
            page.getFooter().setModel(oui5lib.configuration.getAppInfoModel());
         }
      },
      getRouter: function() {
         return this.getOwnerComponent().getRouter();
      },
      _onRouteMatched: function(oEvent) {
         const routeName = oEvent.getParameter("name");
         const routeConfig = oEvent.getParameter("config");
         const routeParameters = oEvent.getParameter("arguments");
         
         const routeData = {};
         if (typeof routeParameters.id === "undefined") {
            routeData.type = "new order";
         } else {
            routeData.type = "edit order";
            routeData.orderId = routeParameters.id;

            switch(routeName) {   
            case "orderProducts":
               routeData.type = "products";
               break;
            case "orderAddress":
               const addressType = routeParameters.type;
               routeData.type = addressType + "Address";
               break;
            case "orderAddresses":
               routeData.type = "addresses";
               const params = routeParameters["?params"];
               const listParams = [];
               for (let key in params) {
                  listParams.push({ name: key, value: params[key] });
               }
               routeData.params = listParams;
               break;
            }
         }
         oui5lib.logger.debug("routing event: " + routeName);
         const model = new sap.ui.model.json.JSONModel(routeData);
         this.getView().setModel(model, "routeData");
      },

      toOrder: function(routeName, params) {
         const model = this.getView().getModel();
         this.getRouter().vNavTo(routeName, params, model.getProperty("/history"));
      },
      showHistory: function() {
         this.getRouter().navTo("history");      
      },
      backHome: function() {
         this.getRouter().navTo("home");      
      }
   });
   
   return orderController;
});
