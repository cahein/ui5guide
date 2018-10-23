sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";

   /**
    * Use the BaseController for every controller. 
    * @interface oui5lib.controller.BaseController
    */
   var BaseController = Controller.extend("oui5lib.controller.BaseController", {
      /**
       * Convenience method for accessing the router.
       * @memberof oui5lib.controller.BaseController
       * @returns {sap.ui.core.routing.Router} The router for this component.
       */
      getRouter: function () {
         return sap.ui.core.UIComponent.getRouterFor(this);
      },

      /**
       * Convenience method for accessing the event bus.
       * @memberof oui5lib.controller.BaseController
       * @returns {sap.ui.core.EventBus} the event bus for this component
       */
      getEventBus: function () {
         return this.getOwnerComponent().getEventBus();
      },
      getResourceBundle : function () {
         return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      /**
       * Log a message to the browser console. Will only print the message when logLevel is DEBUG.
       * @memberof oui5lib.controller.BaseController
       * @param msg {string} The string to be printed. 
       */
      debug: function (msg) {
         oui5lib.logger.debug(this.addControllerName(msg));
      },

      /**
       * Log a message to the browser console. Will only print the message when logLevel is at least INFO.
       * @memberof oui5lib.controller.BaseController
       * @param msg {string} The string to be printed. 
       */
      info: function (msg) {
         oui5lib.logger.info(this.addControllerName(msg));
      },

      /**
       * Log a message to the browser console. Will only print the message when logLevel is at least WARN.
       * @memberof oui5lib.controller.BaseController
       * @param msg {string} The string to be printed. 
       */
      warn: function (msg) {
         oui5lib.logger.warn(this.addControllerName(msg));
      },

      /**
       * Log a message to the browser console.
       * @memberof oui5lib.controller.BaseController
       * @param msg {string} The string to be printed. 
       */
      error: function (msg) {
         oui5lib.logger.error(this.addControllerName(msg));
      },

      addControllerName: function(msg) {
         var metadata = this.getMetadata();
         return metadata.getName() + " > " + msg;
      }
   });
   return BaseController;
});
