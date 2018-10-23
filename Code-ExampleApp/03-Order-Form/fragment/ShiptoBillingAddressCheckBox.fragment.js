sap.ui.jsfragment("oum.fragment.ShiptoBillingAddressCheckBox", {
   createContent: function (oController) {
      const checkBox = new sap.m.CheckBox(oController.getView().createId("shiptoBillingAddressCheckBox"), {
         editable: "{state>/editable}",
         selected: "{common>/shiptoBillingAddress}",
         text: "{i18n>order.shiptoBilling}",
         tooltip: "{i18n>order.shiptoBilling.tooltip}",
         select: function(oEvent) {
            oController.handleShiptoBilling(oEvent);
         }
      });
      return checkBox;
   }
});
