sap.ui.define([
   "sap/m/routing/Router"
], function (mRouter) {
   mRouter.extend("oum.Router", {
      constructor: function() {
         mRouter.apply(this, arguments);
      },

      vNavTo : function(sName, oParameters, bReplace) {
         const route = this.getRoute(sName);
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
      
      destroy: function() {
         mRouter.prototype.destroy.apply(this, arguments);
      }
   });
});
