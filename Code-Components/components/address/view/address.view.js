sap.ui.jsview("uum.view.address", {
   getControllerName : function() {
      return "uum.controller.address";
   },
   
   createContent : function(oController) {
      const addressForm = new sap.ui.layout.form.SimpleForm(this.createId("addressForm"),{
         title: "SimpleForm 'title'",
         editable: true,
         layout: "ResponsiveGridLayout"
      });

      const nameInput = new sap.m.Input({
         value: {
            path: "/name",
         },
         liveChange: function(oEvent) {
            oController.nameInputLiveChange(oEvent);
         }
      });
      const nameLabel = new sap.m.Label({
         text: "Name",
         required: true,
         design: "Bold",
         labelFor: nameInput
      });
      addressForm.addContent(nameLabel).addContent(nameInput);

      return addressForm;
   }
});
