sap.ui.define([
   "sap/ui/core/UIComponent",
   "oum/Router"
], function (UIComponent) {
   const Component = UIComponent.extend("oum.Component", {
      metadata: { 
         manifest: "json"
      }
   });

   oum.Component.prototype.init = function() {
      UIComponent.prototype.init.apply(this, arguments);

      // initialize the oum.Router
      this.getRouter().initialize();
   };

   oum.Component.prototype.createContent = function() {
      return sap.ui.view({
         viewName : "oum.view.app",
         type : "XML"
      });
   };

   return Component;
});
