sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";
   
   /** @module oum.controller.entry */
   const entryController = Controller.extend("oum.controller.entry", {
      onInit: function () {
         this.getRouter().getRoute("home")
            .attachMatched(this._onRouteMatched,
                           this);
      },
      _onRouteMatched: function(oEvent) {
         this.debug("coming home");
      },

      /**
       * Used as handler for tile press events. 
       * @param routeName {sap.ui.base.Event} The event object.
       */
      routeTo : function(oEvent) {
         const tile = oEvent.getSource();
         const routeName = tile.data("routeName");
         
         this.info("navTo: " + routeName);
         this.getRouter().vNavTo(routeName);
      },
      onExit: function() {
         this.info("destroying entry view");
      },
      onBeforeRendering: function() {
         this.info("going to render entry view");
      },
      onAfterRendering: function() {
         this.info(" rendering of entry view is complete");
      }
   });

   return entryController;
});
