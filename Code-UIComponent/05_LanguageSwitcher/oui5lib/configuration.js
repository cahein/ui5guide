(function() {
   function getComponent() {
      const componentId = getConfigData("componentId");
      if (typeof componentId === "string") {
         return sap.ui.getCore().getComponent(componentId);
      }
      return null;
   }
   
   function setLanguageModel(languageCode) {
      // set i18n model
      const oI18nModel = new sap.ui.model.resource.ResourceModel({
         bundleUrl: "i18n/i18n.properties",
         bundleLocale: languageCode
      });
      const component = getComponent();
      component.setModel(oI18nModel, "i18n");
   }

   function setCurrentLanguage(languageCode) {
      const availableLanguages = getAvailableLanguages();
      if (!(availableLanguages instanceof Array)) {
         return;
      }

      if (availableLanguages.indexOf(languageCode) === -1) {
         languageCode = getConfigData("defaultLanguage");
      }

      const ui5Configuration = sap.ui.getCore().getConfiguration();
      ui5Configuration.setLanguage(languageCode);
      oui5lib.config.currentLanguage = languageCode;

      setLanguageModel(languageCode);
   }

   function getCurrentLanguage() {
      return getConfigData("currentLanguage");
   }
   function getAvailableLanguages() {
      return getConfigData("availableLanguages");
   }
   
   function getConfigData(key) {
      if (typeof oui5lib.config === "undefined" ||
          typeof oui5lib.config[key] === "undefined") {
         return undefined;
      }
      return oui5lib.config[key];
   }
   
   const configuration = oui5lib.namespace("configuration");
   configuration.getComponent = getComponent;
   configuration.setCurrentLanguage = setCurrentLanguage;
   configuration.getCurrentLanguage = getCurrentLanguage;
   configuration.getAvailableLanguages = getAvailableLanguages;
}());
