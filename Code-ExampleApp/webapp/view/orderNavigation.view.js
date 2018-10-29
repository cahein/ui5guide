sap.ui.jsview("oum.view.orderNavigation", {
   getControllerName : function() {
      return "oum.controller.orderNavigation";
   },
   
   createContent : function(oController) {
      const orderSections = new sap.m.List(this.createId("orderSections"), {
         mode: sap.m.ListMode.SingleSelectMaster,
         selectionChange: function (oEvent) {
            oController.navigate(oEvent);
         }
      });
      const overview =new sap.m.StandardListItem({
         title: "{i18n>orderNav.overview}",
         icon: "sap-icon://sales-order",
         tooltip: "{i18n>orderNav.overview.tooltip}",
         info: "{common>/info}",
         infoState: "{common>/infoState}"
      });
      overview.data("routeName", "order");
      orderSections.addItem(overview);

      const billingAddress =new sap.m.StandardListItem({
         title: "{i18n>address.billing}",
         icon: "sap-icon://addresses",
         tooltip: "{i18n>address.billing.tooltip}"
      });
      billingAddress.data("routeName", "orderAddress");
      billingAddress.data("addressType", "billing");
      orderSections.addItem(billingAddress);

      const shippingAddress =new sap.m.StandardListItem({
         title: "{i18n>address.shipping}",
         icon: "sap-icon://addresses",
         tooltip: "{i18n>address.shipping.tooltip}",
         visible: "{common>/hideShippingAddress}"
      });
      shippingAddress.data("routeName", "orderAddress");
      shippingAddress.data("addressType", "shipping");
      orderSections.addItem(shippingAddress);

      return new sap.m.Page({
         content: [ orderSections ]
      });
   }
});



