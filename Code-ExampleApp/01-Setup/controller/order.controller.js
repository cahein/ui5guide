sap.ui.define([
   "oum/controller/OrderBaseController",
   "oum/do/orders",
   "oum/do/Order",
   "oum/do/products"
], function(oController, orders, Order, products) {
   "use strict";

   const orderController = oController.extend("oum.controller.order", {
      onInit: function() {
      }
   });
   return orderController;
});
