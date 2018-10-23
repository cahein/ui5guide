sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (oController) {
   "use strict";

   const appController = oController.extend("oum.controller.app", {
      onNavigate: function(oEvent) {
         const from = oEvent.getParameter("from");
         const to = oEvent.getParameter("to");
         oui5lib.logger.debug("navigate from " + from.getViewName() +
                              " to " + to.getViewName());
         const firstTime = oEvent.getParameter("firstTime");
         if (firstTime) {
            oui5lib.logger.debug("to be navigated to first time");
         }
      }
   });
   return appController;
});
