sap.ui.jsview("oum.view.orderAddress", {
   getControllerName : function() {
      return "oum.controller.orderAddress";
   },
   
   createContent : function(oController) {
      const landmarkInfo = new sap.m.PageAccessibleLandmarkInfo({
         rootLabel: "Edit or add new order address",
         headerRole: "Navigation",
         headerLabel: "Navigate home, back and to the help page",
         contentRole: "Main",
         contentLabel: "Form to edit the address. Includes an address search",
         footerRole: "Complementary",
         footerLabel: "Save or cancel"
      });

      const form = new sap.ui.layout.form.SimpleForm(this.createId("addressForm"), {
         editable: true,
         layout: "ResponsiveGridLayout",
         labelSpanS: 3,
         labelSpanM: 3,
         labelSpanL: 2
      });
      oController.addInput(form, "address", "firstname");
      const nameInput = oController.addInput(form, "address", "lastname");
      nameInput.attachChange(function(oEvent) {
         oController.queryAddresses(oEvent);
      });
         
      oController.addInput(form, "address", "street");
      oController.addInput(form, "address", "city");
      oController.addInput(form, "address", "postcode");
      oController.addSelect(form, "address", "countryCode");
      oController.addInput(form, "address", "phone");

      form.setToolbar(
         new sap.m.Toolbar({
            content: [
               new sap.m.Button({
                  type: "Emphasized",
                  text: "{i18n>address.find}",
                  tooltip: "{i18n>address.find.tooltip}",
                  press: function() {
                     oController.openAddressDialog();
                  }
               })
            ]
         })
      );
      
      return new sap.m.Page({
         landmarkInfo: landmarkInfo,
         customHeader: sap.ui.jsfragment("oum.fragment.NavigationHeader", oController),
         content: [
            new sap.m.VBox(this.createId("messagesContainer")),
            sap.ui.jsfragment(
               "oum.fragment.ShiptoBillingAddressCheckBox", oController),
            form
         ],
         footer : sap.ui.jsfragment("oum.fragment.CancelAndSaveBar", oController)
      });
   }
});











