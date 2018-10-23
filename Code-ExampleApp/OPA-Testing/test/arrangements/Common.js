sap.ui.define([
   "sap/ui/test/Opa5"
], function(Opa5) {
   "use strict";

   const Common = Opa5.extend("oum.test.arrangement.Common", {
      start_the_app : function () {
         return this.iStartMyAppInAFrame("index.html");
      }
   });

   return Common;
});
