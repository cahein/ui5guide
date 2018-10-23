(function() {
   "use strict";
   
   /** @namespace oui5lib.request */
   const request = oui5lib.namespace("request");

   /**
    * Load JSON file.
    * @memberof oui5lib.request
    * @param {string} url The URL of the json to load.
    * @param {function} resolve The function to call if the request is successfully completed. 
    * @param {object} props Properties to be passed with the request.
    * @param {boolean} isAsync Load asynchronously? Defaults to 'true'.
    */
   function loadJson(url, resolve, props, isAsync) {
      if (typeof isAsync !== "boolean") {
         isAsync = true;
      }

      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", url, isAsync);
      
      addHandlers(xhr, resolve, props, isAsync);        

      xhr.send();
   }
   request.loadJson = loadJson;

   function addHandlers(xhr, resolve, props, isAsync) {
      xhr.onload = function() {
         if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
               let data = null;
               try {
                  data = JSON.parse(xhr.responseText);
               } catch(e) {
                  throw new Error("JSON is invalid ");
               }
               if (typeof resolve === "function") {
                  resolve(data, props);
               }
            } else {
               publishFailureEvent("status", xhr, props);
            }
         }
      };
      
      xhr.onerror = function() {
         publishFailureEvent("error", xhr, props);
      };

      if (isAsync) {
         xhr.timeout = 500;
         xhr.ontimeout = function() {
            publishFailureEvent("timeout", xhr, props);
         };
      }
      return xhr;
   }

   
   /**
    * Publish event in case of an error.
    * @memberof oui5lib.request
    * @inner 
    * @param {string} eventId One of 'status', 'error', 'timeout'.
    * @param {object} props
    */
   function publishFailureEvent(eventId, xhr, props) {
      if (typeof sap !== "undefined" &&
          typeof sap.ui !== "undefined") {
         if (typeof props === "undefined" || props === null) {
            props = {};
         }
         props.xhrObj = xhr; 
         var eventBus = oui5lib.util.getComponentEventBus();
         eventBus.publish("xhr", eventId, props);
      }
   }
}());
