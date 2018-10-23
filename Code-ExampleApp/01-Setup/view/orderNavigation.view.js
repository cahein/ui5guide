sap.ui.jsview("oum.view.orderNavigation", {
   getControllerName : function() {
      return "oum.controller.orderNavigation";
   },
   createContent : function(oController) {
      const landmarkInfo = new sap.m.PageAccessibleLandmarkInfo({
         headerRole: "Complementary",
         headerLabel: "Show information about the edited order",
         contentRole: "Main",
         contentLabel: "Items to navigate order details"
      });
      return new sap.m.Page({
         landmarkInfo: landmarkInfo
      });
   }
});
