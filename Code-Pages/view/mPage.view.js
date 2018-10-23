sap.ui.jsview("oum.view.mPage", {
   getControllerName: function() {
      return "oum.controller.pageExamples";
   },

   createContent: function(oController) {
      const landmarkInfo = new sap.m.PageAccessibleLandmarkInfo({
         rootLabel: "example page constructed with sap.m.Page",
         headerRole: "Region",
         headerLabel: "back button and title",
         subHeaderRole: "Complementary",
         subHeaderLabel: "save and cancel buttons",
         contentRole: "Main",
         contentLabel: "this is only for demonstration",
         footerRole: "None"
      });
      const pageControl = new sap.m.Page({
         landmarkInfo: landmarkInfo,
         showHeader: true,
         title: "sap.m.Page Example: title",
         titleLevel: "H1",
         showNavButton: true,
         navButtonTooltip: "Navigate back",
         navButtonPress: function() {
            oController.navBack();
         },
         headerContent: [
            sap.ui.jsfragment("oum.fragment.HomeButton")
         ],
          
         showSubHeader: true,
         subHeader: new sap.m.Bar({
            contentMiddle: [
               new sap.m.Title({
                  text: "subHeader Title",
                  level: "H2",
                  titleStyle: "H2"
               })
            ],
            contentRight: [
               new sap.m.Button({
                  icon: "sap-icon://save",
                  tooltip: "Save content changes"
               }),
               new sap.m.Button({
                  icon: "sap-icon://sys-cancel",
                  tooltip: "Revert changes and go back"
               })
            ]
         }),
          
         enableScrolling: true,
         content: [
            new sap.m.Title({
               text: "Main content area",
               level: "H3",
               titleStyle: "H3"
            })
         ],
          
         showFooter: true,
         floatingFooter: true,
         footer: sap.ui.xmlfragment("oum.fragment.AppInfoToolbar")
      });

      return [ pageControl ];
   }
});
