sap.ui.jsview("oum.view.orders", {
   getControllerName : function() {
      return "oum.controller.orders";
   },
   createContent : function(oController) {
      const landmarkInfo = new sap.m.PageAccessibleLandmarkInfo({
         rootLabel: "List of orders with query form",
         headerRole: "Navigation",
         headerLabel: "Navigate home, back and to the help page",
         subHeaderRole: "Search",
         subHeaderLabel: "Filter orders and toggle query form",
         contentRole: "Main",
         contentLabel: "The query form and the list of orders"
      });
      return new sap.m.Page({
         landmarkInfo: landmarkInfo
      });
   }
});
