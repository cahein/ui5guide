sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const addressController = Controller.extend("uum.controller.address", {
      onInit: function () {
         const layoutModel = new sap.ui.model.json.JSONModel();
         layoutModel.setData({
            "titleText": "Address Form"
         });
         const layoutPage = sap.ui.getCore().byId("oumLayout");
         layoutPage.setModel(layoutModel, "layout");

         this.getRouter()
            .attachRouteMatched(this._onRouteMatched,
                                this);
      },
      _onRouteMatched: function(oEvent) {
         this.debug(oEvent.getParameter("name"));
      },
      nameInputLiveChange: function(oEvent) {
         this.info("liveChange event");
      }
   });

   return addressController;
});
