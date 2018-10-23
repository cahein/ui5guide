(function(configuration) {
   /** @namespace oui5lib.util */
   const util = oui5lib.namespace("util");

   function getComponentRouter() {
      const component = oui5lib.configuration.getComponent(); 
      return component.getRouter();
   }
   util.getRouter = getComponentRouter;

   function getI18nModel() {
      const component = configuration.getComponent();
      return component.getModel("i18n");
   }
   function getI18nText(path, args) {
      const resourceBundle = getI18nModel().getResourceBundle();
      return resourceBundle.getText(path, args);
   }
   util.getI18nText = getI18nText;
}(oui5lib.configuration));
