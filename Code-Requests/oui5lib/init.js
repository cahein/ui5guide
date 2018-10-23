if (typeof oui5lib === "undefined") {
   var oui5lib = {};
}
oui5lib.namespace = function(string) {
   const levels = string.split(".");
   let object = this;
   for (let i = 0, l = levels.length; i < l; i++) {
      if (typeof object[levels[i]] === "undefined") {
         object[levels[i]] = {};
      }
      object = object[levels[i]];
   }
   return object;
};

const xhr = new XMLHttpRequest();
xhr.open("GET", "config.json", false);
xhr.onload = function() {
   if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 0) {
         try {
            const configData = JSON.parse(xhr.responseText);
            oui5lib.config = configData;
         } catch (e) {
            throw new Error("Not valid JSON");
         }
      }
   }
};
xhr.send();

sap.ui.require([
    "oui5lib.configuration",
    "oui5lib.logger",
    "oui5lib.event",
    "oui5lib.request",
    "oui5lib.mapping"
], function() {
    oui5lib.logger.info("oUI5lib successfully loaded");
});

