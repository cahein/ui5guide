(function() {
   function getComponent() {
      var componentId = getConfigData("componentId");
      if (typeof componentId === "string") {
         return sap.ui.getCore().getComponent(componentId);
      }
      return null;
   }
   
   function setLanguageModel(sLanguage) {
      // set i18n model
      var oI18nModel = new sap.ui.model.resource.ResourceModel({
         bundleUrl: "i18n/i18n.properties",
         bundleLocale: sLanguage
      });
      var component = getComponent();
      component.setModel(oI18nModel, "i18n");
   }

   function setCurrentLanguage(sLanguage) {
      var availableLanguages = getAvailableLanguages();
      if (!(availableLanguages instanceof Array)) {
         return;
      }

      if (availableLanguages.indexOf(sLanguage) === -1) {
         sLanguage = getConfigData("defaultLanguage");
      }

      var configuration = sap.ui.getCore().getConfiguration();
      configuration.setLanguage(sLanguage);
      oui5lib.config.currentLanguage = sLanguage;

      setLanguageModel(sLanguage);
   }

   function getCurrentLanguage() {
      return getConfigData("currentLanguage");
   }
   function getAvailableLanguages() {
      return getConfigData("availableLanguages");
   }

   function getAppModel() {
      var component = getComponent();
      var appConfig = component.getManifestEntry("sap.app");
      
      var appModel = new sap.ui.model.json.JSONModel({
         appTitle: appConfig.title,
         appVersion: appConfig.applicationVersion.version,
         openui5Version: sap.ui.version
      });

      return appModel;
   }
   
   function getLogLevel() {
      var logLevel = getConfigData("logLevel");
      if (logLevel === undefined) {
         return "WARN";
      }
      return logLevel;
   }

   function getTilesDef() {
      var entryPoints = getConfigData("entryPoints");
      if (entryPoints !== undefined && entryPoints instanceof Array) {
         return entryPoints;
      }
      return false;
   }
    
   function getMappingDir() {
      return getConfigData("mappingDirectory");
   }
   function getEnvironment() {
      var environment = getConfigData("environment");
      if (environment === undefined) {
         return "production";
      }
      return environment;
   }
   
   function getConfigData(key) {
      if (typeof oui5lib.config === "undefined" ||
          typeof oui5lib.config[key] === "undefined") {
         return undefined;
      }
      return oui5lib.config[key];
   }

   var configuration = oui5lib.namespace("configuration");
   configuration.getComponent = getComponent;
   configuration.setCurrentLanguage = setCurrentLanguage;
   configuration.getCurrentLanguage = getCurrentLanguage;
   configuration.getAvailableLanguages = getAvailableLanguages;
   configuration.getAppInfoModel = getAppModel;
   configuration.getLogLevel = getLogLevel;
   configuration.getEntryPoints = getTilesDef;
   configuration.getMappingDir = getMappingDir;
   configuration.getEnvironment = getEnvironment;
}());
