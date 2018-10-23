sap.ui.jsview("oum.view.exampleDetail", {
   getControllerName : function() {
      return "oum.controller.splitApp";
   },
   
   createContent : function(oController) {
      const detailPage = new sap.m.Page({
         title: "Example Detail 1",
         showNavButton: true,
         navButtonPress: function() {
            oController.backHome();
         },
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
             new sap.m.Input({
                 value: "{exampleModel>/test}"
             })
         ]
      });
      return detailPage;
   }
});
