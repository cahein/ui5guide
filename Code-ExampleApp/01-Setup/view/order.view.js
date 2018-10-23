sap.ui.jsview("oum.view.order", {
   getControllerName : function() {
      return "oum.controller.order";
   },
   createContent : function(oController) {
      const landmarkInfo = new sap.m.PageAccessibleLandmarkInfo({
         rootLabel: "Order overview",
         headerRole: "Navigation",
         headerLabel: "Navigate home, back and to the help page",
         contentRole: "Main",
         contentLabel: "Basic order infos and table of ordered items",
         footerRole: "Complementary",
         footerLabel: "Save or cancel"
      });
      return new sap.m.Page({
         landmarkInfo: landmarkInfo
      });
   }
});
