sap.ui.jsfragment("oum.fragment.NavigationHeader", {
   createContent: function (oController) {
      const headerTitle = new sap.m.Title(oController.getView().createId("pageTitle"), {
         level: "H2",
         titleStyle: "H4"
      });
      const headerBar = new sap.m.Bar({
         contentLeft: [
            sap.ui.jsfragment("oui5lib.fragment.BackButton", oController)
         ],
         contentMiddle: [ headerTitle ],
         contentRight: [
            sap.ui.jsfragment("oui5lib.fragment.HomeButton", oController),
            sap.ui.jsfragment("oum.fragment.HelpButton", oController)
         ]
      });
      return headerBar;
   }
});
