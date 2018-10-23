(function () {
   /** @namespace oui5lib.util */
   const util = oui5lib.namespace("util");

   function extend(){
      for (let i = 1; i < arguments.length; i++) {
         for (let key in arguments[i]) {
            if(arguments[i].hasOwnProperty(key)) { 
               if (typeof arguments[0][key] === "object"
                   && typeof arguments[i][key] === "object") {
                  extend(arguments[0][key], arguments[i][key]);
               } else {
                  arguments[0][key] = arguments[i][key];
               }
            }
         }
      }
      return arguments[0];
   }
   util.extend = extend;

   function isUI5Env() {
      if (typeof sap === "undefined" ||
          typeof sap.ui === "undefined" ||
          typeof sap.ui.getCore !== "function") {
         return false;
      }
      return true;
   }
   util.isUI5Env = isUI5Env;
}());
