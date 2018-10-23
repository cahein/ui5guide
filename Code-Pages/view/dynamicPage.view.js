sap.ui.jsview("oum.view.dynamicPage", {
   getControllerName : function() {
      return "oum.controller.pageExamples";
   },
   
   createContent : function(oController) {
      const titleObject = new sap.f.DynamicPageTitle({
         snappedHeading: new sap.m.Title({
            text: "DynamicPageTitle 'snappedHeading'",
            level: "H2",
            titleStyle: "H2"
         }),
         expandedHeading: new sap.m.Title({
            text: "DynamicPageTitle 'expandedHeading'",
            level: "H2",
            titleStyle: "H2"
         }),

         navigationActions: [
            sap.ui.jsfragment("oum.fragment.HomeButton")
         ],
         actions: [
            new sap.m.OverflowToolbarButton({
               icon: "sap-icon://show",
               
               text: "Hide Footer",
               press: function(oEvent) {
                  oController.toggleFooter(oEvent);
               }
            })
         ],
         snappedContent: [
            new sap.m.Text({
               text: "'snappedContent' is an array of Control objects"
            })
         ],
         expandedContent: [
            new sap.m.Text({
               text: "'expandedContent' is an array of Control objects"
            })
         ],
         content: [
            new sap.m.Text({
               text: "'content' is an array of Control objects"
            })
         ]            
      });

      const headerObject = new sap.f.DynamicPageHeader({
         pinnable: true,
         content: [
            new sap.m.Text({
               text: "DynamicPageHeader 'content'"
            })
         ]
      });
       
      const dynamicPage = new sap.f.DynamicPage({
         title: titleObject,
         headerExpanded: true,
         toggleHeaderOnTitleClick: true,
         header: headerObject,
         content: new sap.m.Table({
            headerText: "Main content is a Table"
         }),
         showFooter: true,
         footer: sap.ui.xmlfragment("oum.fragment.AppInfoToolbar")
      });
      return dynamicPage;
   }
});
