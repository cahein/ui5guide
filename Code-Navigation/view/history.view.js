sap.ui.jsview("oum.view.history", {
   getControllerName : function() {
      return "oum.controller.history";
   },
   
   createContent : function(oController) {
      const listTemplate = new sap.m.DisplayListItem({
         label: "{history>title}",
         value: "{history>hash}"
      });
      const oList = new sap.m.List();
      oList.bindAggregation("items", "history>/", listTemplate);
      
      const historyPage = new sap.m.Page({
         title: "List history",
         showNavButton: true,
         navButtonPress: function() {
            oController.backHome();
         },
         content: [
            oList
         ],
         footer: sap.ui.xmlfragment("oum.fragment.AppInfoToolbar")
      });
      return historyPage;
   }
});
