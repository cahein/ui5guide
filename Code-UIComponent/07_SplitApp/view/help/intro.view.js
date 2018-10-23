sap.ui.jsview("oum.view.help.intro", {
   createContent: function(oController) {
      const pageTitle = new sap.m.Title({
         text: "{i18n>view.help.intro.title}",
         level: "H2",
         titleStyle: "H4"
      });
      const page = new sap.m.Page({
         customHeader: new sap.m.Bar({
            contentMiddle: [ pageTitle ]
         }),
         content : [  ]
      });
      return page;
   }
});
