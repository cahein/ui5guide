sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const layoutController = Controller.extend("oum.controller.layout", {
      onInit: function () {
         const page = this.getView().getContent()[0];
         page.getFooter().setModel(oui5lib.configuration.getAppInfoModel());
      },
      buttonPressed: function(oEvent) {
         this.info("button pressed");
      }
   });

   return layoutController;
});
