sap.ui.jsview("oum.view.address", {
   getControllerName : function() {
      return "oum.controller.address";
   },
   
   createContent : function(oController) {
      const addressForm = new sap.ui.layout.form.SimpleForm(this.createId("addressForm"), {
         title: "Edit Address",
         editable: true,
         layout: "ResponsiveGridLayout"
      });
      
      return addressForm;
   }
});
