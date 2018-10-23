sap.ui.define([
   "sap/ui/core/UIComponent",
   "oum/Router",
   "oui5lib",
   "oum/lib/configuration",
   "oum/lib/eventHandlers",
   "oum/lib/ui"
], function (UIComponent) {
   const Component = UIComponent.extend("oum.Component", {
      metadata: { 
         manifest: "json"
      }
   });

   oum.Component.prototype.init = function() {
      UIComponent.prototype.init.apply(this, arguments);

      const ui5Configuration = sap.ui.getCore().getConfiguration();
      let languageCode = ui5Configuration.getLanguage();
      if (typeof languageCode === "string" && languageCode.length > 2) {
         languageCode = languageCode.substring(0, 2).toLowerCase();
      }
      oui5lib.configuration.setCurrentLanguage(languageCode);

      // initialize the oum.Router
      this.getRouter().initialize();

      const eventBus = this.getEventBus();
      eventBus.subscribe("xhr", "status", oum.lib.eventHandlers.handleRequestFailure);
      eventBus.subscribe("xhr", "error", oum.lib.eventHandlers.handleRequestFailure);
      eventBus.subscribe("xhr", "timeout", oum.lib.eventHandlers.handleRequestFailure);
   };
   
   oum.Component.prototype.createContent = function() {
      return sap.ui.view({
         viewName : "oum.view.app",
         type : "XML"
      });
   };
   return Component;
});
