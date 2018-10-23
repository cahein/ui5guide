sap.ui.jsview("oum.view.entry", {
   createContent : function(oController) {
      const entryPage = new sap.m.Page({
         title : "{i18n>ui5manual.title}"
      });
      return entryPage;
   }
});
