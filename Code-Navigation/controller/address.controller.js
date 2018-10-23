sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const addressController = Controller.extend("oum.controller.address", {
      onInit: function () {
         const model = new sap.ui.model.json.JSONModel();
         model.setData({
            "titleText": "Address Form"
         });
         const layoutPage = sap.ui.getCore().byId("oumLayout");
         layoutPage.setModel(model, "layout");
         const layoutView = layoutPage.getParent();
         console.log(layoutView.getController());

         this.getRouter().getRoute("address")
            .attachMatched(this._onRouteMatched,
                           this);
      },
      _onRouteMatched: function(oEvent) {
         this.debug("route name: " + oEvent.getParameter("name"));
      }
   });

   return addressController;
});
