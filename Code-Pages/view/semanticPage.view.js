sap.ui.jsview("oum.view.semanticPage", {
   getControllerName : function() {
      return "oum.controller.semanticExamples";
   },
   
   createContent : function(oController) {
      const semanticPage = new sap.f.semantic.SemanticPage({
         titleHeading: new sap.m.Title({
            text: "Fiori Semantic Page: 'titleHeading'"
         }),
         titleSnappedContent: [
            new sap.m.Text({
               text: "'titleSnappedContent' is an array of Control objects"
            })
         ],
         titleExpandedContent: [
            new sap.m.Text({
               text: "'titleExpandedContent' is an array of Control objects"
            })
         ],
         headerContent: [
            new sap.m.Text({
               text: "'headerContent' is an array of Control objects"
            })
         ],
         content: [
            new sap.m.Title({
               text: "Main content area",
               level: "H2",  titleStyle: "H3"
            })
         ],
         closeAction: new sap.f.semantic.CloseAction(),
         fullScreenAction: new sap.f.semantic.FullScreenAction(),
         exitFullScreenAction: new sap.f.semantic.ExitFullScreenAction(),

         titleMainAction: new sap.f.semantic.TitleMainAction({
            text: "TitleMainAction",
            press: function(oEvent) {
               oController.titleMainAction(oEvent);
            }
         }),
         editAction: new sap.f.semantic.EditAction(),
         deleteAction: new sap.f.semantic.DeleteAction(),
         copyAction: new sap.f.semantic.CopyAction(),
         addAction: new sap.f.semantic.AddAction(),
         
         printAction:  new sap.f.semantic.PrintAction(),
         sendEmailAction:  new sap.f.semantic.SendEmailAction(),
         sendMessageAction:  new sap.f.semantic.SendMessageAction(),


         
         showFooter: true,
         footerMainAction: new sap.f.semantic.FooterMainAction({
            text: "FooterMainAction"
         }),
         positiveAction:  new sap.f.semantic.PositiveAction(),
         negativeAction:  new sap.f.semantic.NegativeAction()
      });
      return semanticPage;
   }
});
