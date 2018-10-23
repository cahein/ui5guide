sap.ui.controller("oum.controller.root", {
   onNavigate: function(oEvent) {
      var to = oEvent.getParameter("to");
      if (!oui5lib.currentuser.hasPermissionForView(to.getViewName())) {
         oEvent.preventDefault();
         this.getRouter().vNavTo("notAuthorized");
      }
   },

   getRouter: function() {
      return this.getOwnerComponent().getRouter();
   }
});
