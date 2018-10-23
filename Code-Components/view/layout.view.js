sap.ui.jsview("oum.view.layout", {
   getControllerName : function() {
      return "oum.controller.layout";
   },
   
   createContent : function(oController) {
      const headerTitle = new sap.m.Title({
         text: "{layout>/titleText}",
         level: "H2",
         titleStyle: "H2"
      });
      const headerBar = new sap.m.Bar({
         contentMiddle: [ headerTitle ],
         contentRight: [
            sap.ui.jsfragment("oum.fragment.BackButton", oController),
            new sap.m.Button({
               icon : "sap-icon://sys-help",
               tooltip : "{i18n>button.help.tooltip}",
               press: function() {
                  oController.buttonPressed();
               }
            })
         ]
      });
      
      const layoutPage = new sap.m.Page("oumLayout", {
         customHeader: headerBar,
         content: [  ],
         footer: sap.ui.xmlfragment("oum.fragment.AppInfoToolbar")
      });
      return layoutPage;
   }
});
