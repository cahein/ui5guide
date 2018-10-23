sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   var entryController = Controller.extend("oum.controller.entry", {
      onInit: function () {
         if (!this.verifyPermission()) {
            return;
         }
         
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
