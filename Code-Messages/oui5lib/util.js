(function() {
   const util = oui5lib.namespace("util");

   function getComponentRouter() {
      const component = oui5lib.configuration.getComponent(); 
      return component.getRouter();
   }
   util.getRouter = getComponentRouter;

   function getI18nText(key) {
      const component = oui5lib.configuration.getComponent(); 
      const i18nModel = component.getModel("i18n");
      return i18nModel.getProperty(key);
   }
   util.getI18nText = getI18nText;
}(oui5lib.configuration));
