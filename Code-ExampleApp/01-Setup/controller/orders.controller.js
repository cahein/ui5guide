sap.ui.define([
   "oui5lib/controller/BaseController",
   "oum/do/Loader",
   "oum/do/orders",
   "oum/do/statuses"
], function(oController, loader, orders, statuses) {
   "use strict";

   const ordersController = oController.extend("oum.controller.orders", {
      onInit: function() {
      }
   });
   return ordersController;
});
