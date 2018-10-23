sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const historyController = Controller.extend("oum.controller.history", {
      onInit: function () {
         this.getRouter().getRoute("history")
            .attachMatched(this._onRouteMatched,
                           this);

         const page = this.getView().getContent()[0];
         if (typeof page.getFooter === "function") {
            page.getFooter().setModel(oui5lib.configuration.getAppInfoModel());
         }
      },
      _onRouteMatched: function(oEvent) {
         const historyData = [];
         // var routingHistory = sap.ui.core.routing.History.getInstance();
         // var history = routingHistory.aHistory;

         const router = this.getRouter();
         const history = router.getTitleHistory();
         const model = new sap.ui.model.json.JSONModel(history.reverse());
         this.getView().setModel(model, "history");
      },
      backHome: function() {
         this.getRouter().navTo("home");      
      }
   });

   return historyController;
});
