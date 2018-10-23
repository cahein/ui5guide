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

   oum.Component.prototype.init = function() {
      UIComponent.prototype.init.apply(this, arguments);
      
      const ui5configuration = sap.ui.getCore().getConfiguration();
      let languageCode = ui5configuration.getLanguage();
      if (typeof languageCode === "string" &&
          languageCode.length > 2) {
         languageCode = languageCode.substring(0, 2).toLowerCase();
      }
      oui5lib.configuration.setCurrentLanguage(languageCode);

      if (typeof oui5lib.currentuser === "object") {
         oui5lib.currentuser.init();
         oui5lib.util.deepFreeze(oui5lib.configuration);
         oui5lib.util.deepFreeze(oui5lib.currentuser);
         oui5lib.util.deepFreeze(oui5lib.request);
      }

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
