sap.ui.define([
   "sap/ui/core/UIComponent"
], function (UIComponent) {
   var Component = UIComponent.extend("uum.Component", {
      metadata: { 
         manifest: "json",
         manifestFirst: true
      }
   });

   uum.Component.prototype.init = function() {
      UIComponent.prototype.init.apply(this, arguments);
   };
   return Component;
});
