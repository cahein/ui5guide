sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const controller = Controller.extend("oum.controller.orderNavigation", {
      onInit: function() {
         this.getRouter().attachRoutePatternMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function(oEvent) {
         const params = oEvent.getParameters();
         const routeName = params.name;

         if (routeName === "order" || routeName === "orderAddress") {
            const orderId = params.arguments.id;
         
            let pageTitle = "";
            if (orderId  === undefined || orderId == "-1") {
               this.orderId = "-1";
               pageTitle = oui5lib.util.getI18nText("orderNav.pageTitle.newOrder");
            } else {
               this.orderId = orderId;
               pageTitle = oui5lib.util.getI18nText("orderNav.pageTitle.Order", orderId);
            }
            this.debug("current orderId: " + this.orderId);
            const page = this.getView().getContent()[0];
            page.setTitle(pageTitle);

            this.selectListItem(routeName, params);
         }
      },
      selectListItem: function(routeName, params) {
         const sectionList = this.getView().byId("orderSections");
         const sectionItems = sectionList.getItems();
         
         let selectedItem = null;

         switch(routeName) {
         case "order":
            selectedItem = sectionItems[0];
            break;
         case "orderAddress": {
            const addressType = params.arguments.type;
            if (addressType === "billing") {
               selectedItem = sectionItems[1];
            } else if (addressType === "shipping") {
               selectedItem = sectionItems[2];
            }
            break;
         }
         }
         if (selectedItem === null) {
            this.getRouter().navTo("noRoute");
            return;
         }
         sectionList.setSelectedItem(selectedItem, true);
      },

      wasRecordChanged: function() {
         if (oum.do.editedOrder.isNew()) {
            return false;
         }         
         const splitApp = this.getView().getParent().getParent();
         const detailView = splitApp.getCurrentDetailPage();
         const detailController = detailView.getController();
         if (typeof detailController.wasRecordChanged === "function" &&
             detailController.wasRecordChanged()) {
            oui5lib.messages.confirmUnsavedChanges(
               detailController.handleUnsavedChanges.bind(detailController)); 
            return true;
         }
         return false;
      },
      
      navigate: function(oEvent) {
         if (sap.ui.Device.system.phone) {
            return;
         }

         const list = oEvent.getSource();
         const selectedItem = list.getSelectedItem();
         if (this.wasRecordChanged()) {
            list.setSelectedItem(selectedItem, false);
            return;
         }
         
         const routeName = selectedItem.data("routeName");
         this.info("navigate to " + routeName);

         switch(routeName) {
         case "orderAddress": {
            const addressType = selectedItem.data("addressType");
            this.getRouter().vNavTo("orderAddress", {
               id: this.orderId,
               type: addressType
            });
            break;
         }
         case "order":
            this.getRouter().vNavTo("order", {
               id: this.orderId
            });
            break;
         default:
            this.getRouter().navTo("noRoute");            
         }
      }
   });
   return controller;
});
