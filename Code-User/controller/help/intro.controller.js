sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   var helpIntroController = Controller.extend("oum.controller.help.intro", {
      onInit: function () {
         if (!this.verifyPermission()) {
            return;
         }
      }
   });

   return helpIntroController;
});
