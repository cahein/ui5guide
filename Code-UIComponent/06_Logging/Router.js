sap.ui.define([
   "sap/m/routing/Router"
], function (mRouter) {
   mRouter.extend("oum.Router", {
      constructor: function() {
         mRouter.apply(this, arguments);
      },

      destroy: function() {
         mRouter.prototype.destroy.apply(this, arguments);
      }
   });
});
