sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const pageExamplesController = Controller.extend("oum.controller.pageExamples", {
      onInit: function () {
         const page = this.getView().getContent()[0];
         if (typeof page.getFooter === "function") {
            page.getFooter().setModel(oui5lib.configuration.getAppInfoModel());
         }
      },

      navBack: function() {
         this.getRouter().navBack();
      },

      handleBreadCrumb: function(oEvent) {
         const link = oEvent.getSource();
         this.getRouter().vNavTo(link.getHref());
      },
      
      toggleSideNavigation: function(oEvent) {
         const button = oEvent.getSource();
         
         const view = this.getView();
         const page = view.getContent()[0];
         const sideExpanded = page.getSideExpanded();
         if (sideExpanded) {
            button.setTooltip("Expand Side Navigation");
         } else {
            button.setTooltip("Collapse Side Navigation");
         }
         page.setSideExpanded(!sideExpanded);
      },
      
      navigationItemSelect: function(oEvent) {
         const selectedItem = oEvent.getParameter("item");
         console.log(selectedItem.getKey());
      },

      toggleSubHeader: function(oEvent) {
         const button = oEvent.getSource();
         
         const view = this.getView();
         const page = view.getContent()[0];
         const subHeaderShown = page.getShowSubHeader();
         if (subHeaderShown) {
            button.setTooltip("Show SubHeader");
            button.setIcon("sap-icon://hide");
         } else {
            button.setTooltip("Hide SubHeader");
            button.setIcon("sap-icon://show");
         }
         page.setShowSubHeader(!subHeaderShown);
      },
      
      toggleFooter: function(oEvent) {
         const button = oEvent.getSource();
         
         const view = this.getView();
         const page = view.getContent()[0];

         const footerShown = page.getShowFooter();
         if (footerShown) {
            button.setText("Show Footer");
            button.setTooltip("Show Footer");
            button.setIcon("sap-icon://hide");
         } else {
            button.setText("Hide Footer");
            button.setTooltip("Hide Footer");
            button.setIcon("sap-icon://show");
         }
         page.setShowFooter(!footerShown);
      },

      handleTitleSelectorPress: function() {
         this.info("title selector pressed");
      }
   });
   return pageExamplesController;
});
