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

   function getLogLevel() {
      const logLevel = getConfigData("logLevel");
      if (logLevel === undefined) {
         return "WARN";
      }
      return logLevel;
   }
   
   function getTilesDef() {
      const entryPoints = getConfigData("entryPoints");
      if (entryPoints !== undefined && entryPoints instanceof Array) {
         return entryPoints;
      }
      return false;
   }

   function getAppModel() {
      const component = getComponent();
      const appConfig = component.getManifestEntry("sap.app");
      
      const appModel = new sap.ui.model.json.JSONModel({
         appTitle: appConfig.title,
         appVersion: appConfig.applicationVersion.version,
         openui5Version: sap.ui.version
      });

      return appModel;
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
   configuration.getLogLevel = getLogLevel;
   configuration.getEntryPoints = getTilesDef;
   configuration.getAppInfoModel = getAppModel;
}());
