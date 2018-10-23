sap.ui.jsfragment("oum.fragment.ListExampleButtons", {
   createContent: function (oController) {
      const toTableBtn = new sap.m.Button({
         icon: "sap-icon://table-view",
         text: "Show Table",
         press: function() {
            oController.info("navigate to table example");
            oController.getRouter().vNavTo("tableExample");
         }
      });
      const toListBtn = new sap.m.Button({
         icon: "sap-icon://list",
         text: "Show List",
         press: function() {
            oController.info("navigate to list example");
            oController.getRouter().vNavTo("listExample");
         }
      });
      const navToolBar = new sap.m.Toolbar({
         content: [ toTableBtn, toListBtn ]
      });
      return navToolBar;
   }
});
