sap.ui.define([
   "oui5lib/controller/BaseController"
], function(oController) {
   "use strict";

   const entryController = oController.extend("oum.controller.entry", {
      onInit: function () {
         this.getRouter().getRoute("home")
            .attachMatched(this._onRouteMatched,
                           this);

         const page = this.getView().getContent()[0];
         page.getFooter().setModel(oui5lib.configuration.getAppInfoModel());
      },
      _onRouteMatched: function(oEvent) {
         this.debug("coming home");
      },
      routeTo : function(oEvent) {
         const tile = oEvent.getSource();
         const routeName = tile.data("routeName");
         
         this.info("navTo: " + routeName);
         this.getRouter().vNavTo(routeName);
      }
   });

   return entryController;
});
