sap.ui.jsview("oum.view.order", {
   getControllerName : function() {
      return "oum.controller.order";
   },
   
   createContent : function(oController) {
      const form = new sap.ui.layout.form.SimpleForm(this.createId("orderForm"), {
         editable: true,
         layout: "ResponsiveGridLayout",
         labelSpanM: 3,
         labelSpanL: 2
      });

      const orderDate = oController.addDateTimePicker(form, "order", "orderDate");
      orderDate.setEditable(false);
      orderDate.bindProperty("visible", "state>/saved");
      
      let input = oController.addInput(form, "order", "billingName");
      input.setEditable(false);

      const shiptoBillingAddressCheckBox = sap.ui.jsfragment("oum.fragment.ShiptoBillingAddressCheckBox", oController);
      form.addContent(shiptoBillingAddressCheckBox);
      
      input = oController.addInput(form, "order", "shippingName");
      input.setEditable(false);
      input.bindProperty("visible", "common>/hideShippingAddress");
      
      const select = oController.addSelect(form, "order", "status");
      select.bindProperty("enabled", "state>/statusChangeable");
      
      input = oController.addInput(form, "order", "total");
      input.setEditable(false);

      return new sap.m.Page({
         customHeader: sap.ui.jsfragment("oum.fragment.NavigationHeader", oController),
         content: [
            new sap.m.VBox(this.createId("messagesContainer")),
            form
         ],
         footer: sap.ui.jsfragment("oum.fragment.CancelAndSaveBar", oController)
      });
   }
});
