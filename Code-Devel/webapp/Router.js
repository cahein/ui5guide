/** @class oum.Router */
sap.ui.define([
   "sap/m/routing/Router"
], function (mRouter) {
   mRouter.extend("oum.Router", {
      constructor: function() {
         mRouter.apply(this, arguments);
      },

      /**
       * Navigate to the given route.
       * @memberof oum.Router
       * @param sName {string} The route name to navigate to.
       * @param oParameters {object} Parameters as specified by the route pattern.
       * @param bReplace {boolean} Set 'true' to navigate without history entry. Defaults to 'false'.
       */
      vNavTo : function(sName, oParameters, bReplace) {
         var route = this.getRoute(sName);
         if (typeof route === "undefined") {
            this.navTo("noRoute");
         } else {
            if (oParameters === null || oParameters === undefined) {
               oParameters = {};
            }
            if (typeof bReplace !== "boolean") {
               bReplace = false;
            }
            this.navTo(sName, oParameters, bReplace);
         }
      },
      
      /**
       * Navigate back in history. Takes route "home", if there is no application history.
       * @memberof oum.Router
       */
      navBack : function() {
         var oHistory = sap.ui.core.routing.History.getInstance();
         var sPreviousHash = oHistory.getPreviousHash();

         if (typeof sPreviousHash === "undefined") {
            this.navTo("home", {}, true);
         } else {
            window.history.go(-1);
         }
      },

      destroy: function() {
         mRouter.prototype.destroy.apply(this, arguments);
      }
   });
});
