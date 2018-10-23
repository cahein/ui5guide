(function() {
   function getComponent() {
      var componentId = getConfigData("componentId");
      if (typeof componentId === "string") {
         return sap.ui.getCore().getComponent(componentId);
      }
      return null;
   }

   /**
    * Set the language model to the Component.
    * @memberof oui5lib.configuration
    * @param languageCode {string} Two character string for the language. 
    */
   function setLanguageModel(languageCode) {
      // set i18n model
      var oI18nModel = new sap.ui.model.resource.ResourceModel({
         bundleUrl: "i18n/i18n.properties",
         bundleLocale: languageCode
      });
      var component = getComponent();
      component.setModel(oI18nModel, "i18n");
   }
   
   /**
    * Set the currentLanguage configuration value. If the language setting is not available, the default is used instead.
    * @memberof oui5lib.configuration
    * @param languageCode {string} Two character string for the language. 
    */
   function setCurrentLanguage(languageCode) {
      var availableLanguages = getAvailableLanguages();
      if (!(availableLanguages instanceof Array)) {
         return;
      }

      if (availableLanguages.indexOf(languageCode) === -1) {
         languageCode = getConfigData("defaultLanguage");
      }

      var configuration = sap.ui.getCore().getConfiguration();
      configuration.setLanguage(languageCode);
      oui5lib.config.currentLanguage = languageCode;

      setLanguageModel(languageCode);
   }

   function getCurrentLanguage() {
      return getConfigData("currentLanguage");
   }
   function getAvailableLanguages() {
      return getConfigData("availableLanguages");
   }
   
   /**
    * Get model containing application title and version, and openUI5 version.
    * @memberof oui5lib.configuration
    * @returns {sap.ui.model.json.JSONModel} The Model.
    */
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

   /**
    * Get the definition of entry points.
    * @function getEntryPoints
    * @memberof oui5lib.configuration
    * @returns {Array} Tile definitions, or 'false' is there are none defined.
    */
   function getTilesDef() {
      var entryPoints = getConfigData("entryPoints");
      if (entryPoints !== undefined) {
         return entryPoints;
      }
      return false;
   }

   function getConfigData(key) {
      if (typeof oui5lib.config === "undefined" ||
          typeof oui5lib.config[key] === "undefined") {
         return undefined;
      }
      return oui5lib.config[key];
   }

   /** @namespace oui5lib.configuration */
   var configuration = oui5lib.namespace("configuration");
   configuration.getComponent = getComponent;
   configuration.setCurrentLanguage = setCurrentLanguage;
   configuration.getCurrentLanguage = getCurrentLanguage;
   configuration.getAvailableLanguages = getAvailableLanguages;
   configuration.getAppInfoModel = getAppModel;
   configuration.getLogLevel = getLogLevel;
   configuration.getEntryPoints = getTilesDef;
}());
