sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "oui5lib/logger"
], function (Controller, logger) {
   "use strict";

   const BaseController = Controller.extend("oui5lib.controller.BaseController", {
      getRouter: function () {
         return sap.ui.core.UIComponent.getRouterFor(this);
      },
      getEventBus: function () {
         return this.getOwnerComponent().getEventBus();
      },
      getResourceBundle: function () {
         return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      verifyPermission: function() {
         const view = this.getView();
         const viewName = view.sViewName;
         if (!oui5lib.currentuser.hasPermissionForView(viewName)) {
            this.getRouter().navTo("notAuthorized");
            return false;
         }
         return true;
      },
      
      debug: function (msg) {
         logger.debug(this.addControllerName(msg));
      },
      
      info: function (msg) {
         logger.info(this.addControllerName(msg));
      },

      warn: function (msg) {
         logger.warn(this.addControllerName(msg));
      },

      error: function (msg) {
         logger.error(this.addControllerName(msg));
      },

      addControllerName: function(msg) {
         var metadata = this.getMetadata();
         return metadata.getName() + " > " + msg;
      }
   });
   return BaseController;
});
