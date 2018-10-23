sap.ui.define([
   "sap/ui/core/UIComponent"
], function (UIComponent) {
   const Component = UIComponent.extend("oum.Component", {
      metadata: { 
         manifest: "json"
      }
   });

   oum.Component.prototype.init = function() {
      UIComponent.prototype.init.apply(this, arguments);
   };

   return Component;
});
