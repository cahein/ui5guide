sap.ui.jsview("oum.view.exampleMaster2", {
   getControllerName : function() {
      return "oum.controller.splitApp";
   },

   createContent : function(oController) {
      const masterPage = new sap.m.Page({
         title: "Example Master 2",
         content: [
            new sap.m.Button({
               text: "Replace Master",
               press: function(oEvent) {
                  oController.toOtherMaster(oEvent);
               }
            }),
            new sap.m.Button({
               text: "Replace Detail",
               press: function(oEvent) {
                  oController.toOtherDetail(oEvent);
               }
            })
         ]
      });
      return masterPage;
   }
});
