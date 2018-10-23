sap.ui.jsview("oum.view.events", {
   getControllerName : function() {
      return "oum.controller.events";
   },
   createContent : function(oController) {
      var eventPage = new sap.m.Page({
         title: "Explore EventBus",
         showNavButton: true,
         navButtonPress: function() {
            oController.backHome();
         },
         content: [
            new sap.m.HBox({
               items: [
                  new sap.m.Button({
                     text: "Publish Core Event",
                     press: function() {
                        oController.publishCoreEvent();
                     }
                  }),
                  new sap.m.Button({
                     text: "Publish Component Event",
                     press: function() {
                        oController.publishComponentEvent();
                     }
                  })
               ]
            })
         ]
      });
      return eventPage;
   }
});
