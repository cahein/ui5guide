sap.ui.define([
   "oui5lib/controller/FormController",
   "oum/do/statuses"
], function(Controller) {
   "use strict";

   const orderBaseController = Controller.extend("oum.controller.OrderBaseController", {
      setEditedOrder: function(order) {
         oum.do.editedOrder = order;
         this.setCommonModel();
         this.setOrderNotSaved(false);
      },
      getEditedOrder: function() {
         return oum.do.editedOrder;
      },
      prepareEditedOrder: function(orderId) {
         if (orderId === undefined) {
            return;
         }
         let order = this.getEditedOrder();
         if (order === undefined || order.getProperty("id") !== orderId) {
            if (orderId == "-1") {
               order = new oum.do.Order();
            } else {
               order = new oum.do.Order(orderId, true);
            }
            if (order instanceof oum.do.Order) {
               this.setEditedOrder(order);
            }
         }
      },
      
      getCommonModel: function() {
         const splitApp = this.getView().getParent().getParent();
         return splitApp.getModel("common");
      },
      setCommonModel: function() {
         const splitApp = this.getView().getParent().getParent();
         let model = splitApp.getModel("common");
         if (model === undefined) {
            model = new sap.ui.model.json.JSONModel();
            splitApp.setModel(model, "common");
         }

         const currentOrder = this.getEditedOrder();
         if (currentOrder instanceof oum.do.Order) {
            model.setProperty("/shiptoBillingAddress",
                              currentOrder.shiptoBillingAddress());
            model.setProperty("/hideShippingAddress",
                              !currentOrder.shiptoBillingAddress());
         }
      },
      setOrderNotSaved: function(bool) {
         const model = this.getCommonModel();
         if (bool) {
            this.setRecordChanged();
            model.setProperty("/info", oui5lib.util.getI18nText("common.notSaved"));
            model.setProperty("/infoState", "Warning");
         } else {
            this.resetRecordChanged();
            model.setProperty("/info", "");
            model.setProperty("/infoState", "None");
         }
      },
      
      handleShiptoBilling: function(oEvent) {
         const shiptoBilling = oEvent.getParameter("selected");
         const currentOrder = this.getEditedOrder();

         if (currentOrder.getProperty("billingAddressId") === null &&
             currentOrder.getProperty("shippingAddressId") === null) {
            oui5lib.messages.showNotification(
               oui5lib.util.getI18nText("order.billingAddress.first"));
            this.toggleShiptoBilling();
            return;
         }
         if (shiptoBilling) {
            if (currentOrder.getProperty("shippingAddressId") !== null) {
               oui5lib.messages.confirmDelete(
                  oui5lib.util.getI18nText("order.shippingAddress.overwrite?"),
                  this.handleShiptoBillingConfirmed.bind(this)
               );
            } else {
               this.setBillingAsShippingAddress(currentOrder);
            }
         } else {
            this.setCommonModel();
            if (currentOrder.getProperty("shippingAddressId") !== null) {
               currentOrder.setProperty("shippingAddressId", null);
               currentOrder.setProperty("shippingName", "");
               this.setOrderNotSaved(true);

               oum.message = {
                  text: oui5lib.util.getI18nText("order.shippingAddress.cleared"),
                  type: "Warning"
               };
            }
            this.getRouter().vNavTo("orderAddress", {
               id: this.orderId,
               type: "shipping"
            });
         }
      },
      handleShiptoBillingConfirmed: function(action) {
         if (action === "DELETE") {
            this.setBillingAsShippingAddress(this.getEditedOrder());
         } else {
            this.toggleShiptoBilling();
         }
      },
      setBillingAsShippingAddress: function(order) {
         order.setProperty("shippingAddressId",
                           order.getProperty("billingAddressId"));
         order.setProperty("shippingName",
                           order.getProperty("billingName"));

         oui5lib.messages.showNotification(
            oui5lib.util.getI18nText("order.shippingAddress.copyBilling"));

         this.setCommonModel();
         this.setOrderNotSaved(true);
      },
      toggleShiptoBilling: function() {
         const model = this.getCommonModel();
         const shiptoBillingAddress = model.getProperty("/shiptoBillingAddress");
         model.setProperty("/shiptoBillingAddress", !shiptoBillingAddress);
         model.setProperty("/hideShippingAddress", shiptoBillingAddress);
      },
      
      handleUnsavedChanges: function(action, navto) {
         if (action === "OK") {
            if (typeof navto === "string") {
               switch(navto) {
               case "home":
                  this.getRouter().vNavTo("home");
                  break;
               case "back":
                  this.getRouter().navBack();
                  break;
               default:
                  this.getRouter().vNavTo(navto);
               }
               this.resetView();
               return;
            }
            this.revertChanges();
         }
      }
   });
   return orderBaseController;
});
