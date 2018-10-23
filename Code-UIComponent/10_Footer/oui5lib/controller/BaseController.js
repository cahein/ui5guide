sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";

   const BaseController = Controller.extend("oui5lib.controller.BaseController", {
      getRouter: function () {
         return sap.ui.core.UIComponent.getRouterFor(this);
      },
      getEventBus: function () {
         return this.getOwnerComponent().getEventBus();
      },
      getResourceBundle : function () {
         return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      debug: function (msg) {
         oui5lib.logger.debug(this.addControllerName(msg));
      },
      
      info: function (msg) {
         oui5lib.logger.info(this.addControllerName(msg));
      },

      warn: function (msg) {
         oui5lib.logger.warn(this.addControllerName(msg));
      },

      error: function (msg) {
         oui5lib.logger.error(this.addControllerName(msg));
      },

      addControllerName: function(msg) {
         const metadata = this.getMetadata();
         return metadata.getName() + " > " + msg;
      }
   });
   return BaseController;
});
