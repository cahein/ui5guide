sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (oController) {
   "use strict";

   const splitAppController = oController.extend("oum.controller.splitApp", {
      onInit: function () {
         const model = new sap.ui.model.json.JSONModel({ test: "" });
         sap.ui.getCore().setModel(model, "exampleModel");
      },

      onMasterNavigate: function(oEvent) {
         const from = oEvent.getParameter("from");
         const to = oEvent.getParameter("to");
         oui5lib.logger.debug("navigate from " + from.getViewName() +
                              " to " + to.getViewName());
         const direction = oEvent.getParameter("direction");
         oui5lib.logger.debug("direction: " + direction);
         const firstTime = oEvent.getParameter("firstTime");
         if (firstTime) {
            oui5lib.logger.debug("to be navigated to first time");
         }
      },

      onDetailNavigate: function(oEvent) {
         const from = oEvent.getParameter("from");
         const to = oEvent.getParameter("to");
         oui5lib.logger.debug("navigate from " + from.getViewName() +
                              " to " + to.getViewName());
         const direction = oEvent.getParameter("direction");
         oui5lib.logger.debug("direction: " + direction);
         const firstTime = oEvent.getParameter("firstTime");
         if (firstTime) {
            oui5lib.logger.debug("to be navigated to first time");
         }
      },

      backHome: function() {
         this.getRouter().navTo("home");      
      },

      toOtherMaster: function() {
         const view = this.getView();
         let viewName = view.getViewName();
         if (viewName.indexOf("master") === -1) {
            viewName = this.getCurrentMasterViewName(view);
         }
         const router = this.getRouter();
         switch(viewName) {
         case "oum.view.exampleMaster":
            router.getTargets().display("exampleMaster2");
            break;
         case "oum.view.exampleMaster2":
            router.getTargets().display("exampleMaster1");
            break;
         }

      },
      
      toOtherDetail: function() {
         const view = this.getView();
         let viewName = view.getViewName();
         if (viewName.indexOf("master") === -1) {
            viewName = this.getCurrentDetailViewName(view);
         }
         const router = this.getRouter();
         switch(viewName) {
         case "oum.view.exampleDetail":
            router.getTargets().display("exampleDetail2");
            break;
         case "oum.view.exampleDetail2":
            router.getTargets().display("exampleDetail1");
            break;
         }
      },

      routeToOtherDetail: function(replace) {
         const view = this.getView();
         const router = this.getRouter();

         const viewName = this.getCurrentDetailViewName(view);
         switch(viewName) {
         case "oum.view.exampleDetail":
            router.navTo("exampleDetail2", null, replace);
            break;
         case "oum.view.exampleDetail2":
            router.navTo("exampleDetail1", null, replace);
            break;
         }
      },
      
      getCurrentMasterViewName: function(view) {
         const splitApp = view.getParent().getParent();
         const masterView = splitApp.getCurrentMasterPage();
         return masterView.getViewName();
      },
      getCurrentDetailViewName: function(view) {
         const splitApp = view.getParent().getParent();
         const detailView = splitApp.getCurrentDetailPage();
         return detailView.getViewName();
      },

      onBeforeRendering: function() {
         oui5lib.logger.debug("beforeRendering view: " + this.getView().getViewName());
      },
      
      onAfterRendering: function() {
         oui5lib.logger.debug("afterRendering view: " + this.getView().getViewName());
      },

      getRouter: function() {
         return this.getOwnerComponent().getRouter();
      }
   });
   
   return splitAppController;
});
