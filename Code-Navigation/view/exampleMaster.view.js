sap.ui.jsview("oum.view.exampleMaster", {
   getControllerName : function() {
      return "oum.controller.splitApp";
   },

   createContent : function(oController) {
      const masterPage = new sap.m.Page({
         title: "Example Master 1",
         content: [
            new sap.m.Button({
               text: "Replace Master",
               press: function() {
                  oController.toOtherMaster();
               }
            }),
            new sap.m.Button({
               text: "Replace Detail",
               press: function() {
                  oController.toOtherDetail();
               }
            }),
            new sap.m.Button({
               text: "Other Detail (History)",
               press: function() {
                  oController.routeToOtherDetail(false);
               }
            }),
            new sap.m.Button({
               text: "Other Detail (no History)",
               press: function() {
                  oController.routeToOtherDetail(true);
               }
            })
         ]
      });
      return masterPage;
   }
});
