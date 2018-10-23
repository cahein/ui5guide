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
      
      const ui5configuration = sap.ui.getCore().getConfiguration();
      let languageCode = ui5configuration.getLanguage();
      if (typeof languageCode === "string" &&
          languageCode.length > 2) {
         languageCode = languageCode.substring(0, 2).toLowerCase();
      }
      const availableLanguages = ["en", "de"];
      if (availableLanguages.indexOf(languageCode) === -1) {
         languageCode = "en";
      }
      ui5configuration.setLanguage(languageCode);
      
      // set i18n model
      const i18nModel = new sap.ui.model.resource.ResourceModel({
         bundleUrl: "i18n/i18n.properties",
         bundleLocale: languageCode
      });
      this.setModel(i18nModel, "i18n");
      
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
