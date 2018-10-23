sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const entryController = Controller.extend("oum.controller.entry", {
      onInit: function () {
         this.getRouter().getRoute("home")
            .attachMatched(this._onRouteMatched,
                           this);
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
