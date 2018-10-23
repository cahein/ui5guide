sap.ui.define([
   "oum/controller/OrderBaseController",
   "oum/do/orders",
   "oum/do/Order",
   "oum/do/addresses",
   "oum/do/Address",
   "oum/do/countries"
], function(oController, orders, Order, addresses, Address, countries) {
   "use strict";

   const orderAddressController = oController.extend("oum.controller.orderAddress", {
      onInit: function() {
      }
   });
   return orderAddressController;
});
