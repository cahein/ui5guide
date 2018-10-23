sap.ui.jsview("oum.view.help.intro", {
   createContent: function(oController) {
      var pageTitle = new sap.m.Title({
         text: "{i18n>view.help.intro.title}",
         level: "H2",
         titleStyle: "H2"
      });
      var page = new sap.m.Page({
         customHeader: new sap.m.Bar({
            contentLeft: [
               sap.ui.jsfragment("oum.fragment.BackButton")
            ],
            contentMiddle: [ pageTitle ],
            contentRight: [
               sap.ui.jsfragment("oum.fragment.HomeButton")
            ]
         }),
         content : [  ]
      });
      return page;
   }
});
