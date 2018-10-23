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
      return new sap.m.Page({
         landmarkInfo: landmarkInfo,
         customHeader: sap.ui.jsfragment("oum.fragment.NavigationHeader", oController),
         content: [
            new sap.m.VBox(this.createId("messagesContainer"))
         ],
         footer : sap.ui.jsfragment("oum.fragment.CancelAndSaveBar", oController)
      });
   }
});











