(function() {
   const eventHandlers = oum.namespace("lib.eventHandlers");

   function handleRequestFailure(channelId, eventId, eventData) {
      oui5lib.logger.error("request error: " + eventId);

      // channelId: xhr
      // eventId: status, error, timeout

      const xhr = eventData.xhrObj;
      let msg = "";
      
      switch(eventId) {
      case "error":
         msg = oui5lib.util.getI18nText("request.error", [ eventData.entity ]);
         break;
      case "status":
         msg = oui5lib.util.getI18nText("request.status", [ xhr.status, eventData.entity, eventData.request ]);
         break;
      case "timeout":
         msg = oui5lib.util.getI18nText("request.timeout", [ eventData.entity ]);
         break;
      }
      
      oui5lib.messages.showErrorMessage(msg);
      oum.lib.ui.setBusy(false);
   }
   eventHandlers.handleRequestFailure = handleRequestFailure;
}());
