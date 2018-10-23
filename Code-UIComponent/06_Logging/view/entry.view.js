sap.ui.jsview("oum.view.entry", {
   createContent : function(oController) {
      const headerTitle = new sap.m.Title({
         text: "{i18n>ui5manual.title}",
         level: "H2",
         titleStyle: "H2"
      });
      const headerBar = new sap.m.Bar({
         contentMiddle: [ headerTitle ],
         contentRight: [
            sap.ui.jsfragment("oum.fragment.LanguageSwitcher")
         ]
      });
      
      const entryPage = new sap.m.Page({
         customHeader: headerBar
      });
      return entryPage;
   }
});
