/** @class oum.Component */
sap.ui.define([
   "sap/ui/core/UIComponent",
   "oum/Router",
   "oui5lib/init"
], function (UIComponent) {
   const Component = UIComponent.extend("oum.Component", {
      metadata: { 
         manifest: "json"
      }
   });

   /**
    * Initializes the Component. Will set the i18n properties model,
    * the appInfo model for the footer, and initialize the oum.Router
    * @memberof oum.Component
    */
   oum.Component.prototype.init = function() {
      UIComponent.prototype.init.apply(this, arguments);
      
      const configuration = sap.ui.getCore().getConfiguration();
      let languageCode = configuration.getLanguage();
      if (typeof languageCode === "string" &&
          languageCode.length > 2) {
         languageCode = languageCode.substring(0, 2).toLowerCase();
      }
      oui5lib.configuration.setCurrentLanguage(languageCode);

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
