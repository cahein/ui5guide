sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (oController) {
   "use strict";

   const eventsController = oController.extend("oum.controller.events", {
      onInit: function () {
         var coreEventBus = sap.ui.getCore().getEventBus();
         coreEventBus.subscribe("eChannel", "eEvent",
                                this.coreEventHandler);
         var componentEventBus = this.getOwnerComponent().getEventBus();
         componentEventBus.subscribe("eChannel", "eEvent",
                                     this.componentEventHandler);
      },

      publishCoreEvent: function() {
         var eventBus = sap.ui.getCore().getEventBus();
         eventBus.publish("eChannel", "eEvent",
                          { test: true, bus: "core" });
      },
      coreEventHandler: function(channel, event, data) {
         oui5lib.logger.debug("core event: " + channel + ":" + event);
         sap.m.MessageToast.show("Core event received: " + channel + ":" + event);
         console.log(data);
      },
      publishComponentEvent: function() {
         var eventBus = this.getOwnerComponent().getEventBus();
         eventBus.publish("eChannel", "eEvent",
                          { ids: [ 1, 2 ] });
      },
      componentEventHandler: function(channel, event, data) {
         oui5lib.logger.debug("component event: " + channel + ":" + event); 
         sap.m.MessageToast.show("Component event received: " + channel + ":" + event);
         console.log(data);
      },
      backHome: function() {
         this.getOwnerComponent().getRouter().navTo("home");      
      }
   });

   return eventsController;
});
