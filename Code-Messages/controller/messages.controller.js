sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   var msgsController = Controller.extend("oum.controller.messages", {
      onInit: function () {
         const model = new sap.ui.model.json.JSONModel();
         model.setData({
            name: "",
            firstInput: "",
            secondInput: "",
            thirdInput: "",
            forthInput: ""
         });
         this.getView().setModel(model);
         
         const msgButtonModel = new sap.ui.model.json.JSONModel({
            "messages_count": 0,
            "messages_buttonType": "Transparent"
         });
         this.getView().setModel(msgButtonModel, "msgs");
      },

      showNotification: function() {
         oui5lib.messages.showNotification("Successfully updated the address", 10000);
      },
      showErrorMessage: function() {
         oui5lib.messages.showErrorMessage("Couldn't save, because the server is down ;-(\n\nPlease try again later. If the problem persists, send an email to itservice@whoever.com.");
      },
      showConfirmUnsavedChanges: function() {
         oui5lib.messages.confirmUnsavedChanges(function(choice) {
            oui5lib.logger.info("confirm unsaved changes? " + choice);
         });
      },
      showConfirmDelete: function() {
         const msg = "Are you sure you want to delete this record?";
         oui5lib.messages.confirmDelete(
            msg,
            function(choice) {
               oui5lib.logger.info("confirm delete? " + choice);
            }
         );
      },
      showMessageStrips: function() {
         const messagesContainer = this.getView().byId("messagesContainer");
         messagesContainer.removeAllItems();

         const msgs = [
            {text: "Customer email invalid", type: "Error" },
            {text: "No products chosen", type: "Warning" },
            {text: "Shipping address is different from billing address", type: "Information" },
            {text: "Saved, despite error and warning :-)", type: "Success" }
         ];
         for (let i = 0, s = msgs.length; i < s; i++) {
            const msg = msgs[i];
            const messageStrip = new sap.m.MessageStrip({
               showCloseButton: true,
               showIcon: true,
               text: msg.text,
               type: msg.type
            });
            messagesContainer.addItem(messageStrip);
         }
      },

      getMessageItemData: function() {
         const msgs = [
            {
               type: "Error",
               title: "Customer email invalid",
               subtitle: "Some subtitle",
               description: "Need a valid email address",
               group: "Error messages"
            },
            {
               type: "Error",
               title: "Customer phone missing",
               description: "Need a phone number",
               group: "Error messages"
            },
            {
               type: "Warning",
               title: "No products chosen",
               description: "Please select a product"
            },
            {
               type: "Information",
               title: "Shipping Address is different from Billing Address"
            },
            {
               type: "Success",
               title: "Saved despite error and warning :-)"
            }
         ];
         return msgs;
      },
      simulateMessages: function() {
         const msgs = this.getMessageItemData();

         const msgsCount = msgs.length;
         if (msgsCount > 0) {
            const msgButtonModel = this.getView().getModel("msgs");
            msgButtonModel.setProperty("/messages_count", msgs.length);
            msgButtonModel.setProperty("/messages_buttonType", "Emphasized");

            const popover = this.getView().byId("messagePopover");
            const msgsModel = new sap.ui.model.json.JSONModel(msgs);
            popover.setModel(msgsModel);
         }
      },
      showMessagePopover: function(oEvent) {
         const popover = this.getView().byId("messagePopover");
         popover.openBy(oEvent.getSource());
      },
      
      openMessagesDialog: function() {
         const msgs = this.getMessageItemData();
         const msgsModel = new sap.ui.model.json.JSONModel(msgs);

         const messageView = this.getView().byId("messageView");
         messageView.setModel(msgsModel);

         const messageDetailBackButton = new sap.m.Button({
	    icon: "sap-icon://nav-back",
	    visible: false,
	    press: function () {
	       messageView.navigateBack();
	       this.setVisible(false);
	    }
         });
         
         messageView.attachItemSelect(function () {
	    messageDetailBackButton.setVisible(true);
	 });
         
         const dialog = new sap.m.Dialog({
	    content: [ messageView ],
	    contentHeight: "440px",
	    contentWidth: "640px",
	    endButton: new sap.m.Button({
	       text: "Close",
	       press: function() {
		  this.getParent().close();
	       }
	    }),
	    customHeader: new sap.m.Bar({
               contentLeft: [
                  messageDetailBackButton
               ],
	       contentMiddle: [
		  new sap.m.Text({ text: "Messages upon saving a new order"})
	       ]
	    }),
	    verticalScrolling: false
	 });
         dialog.open();
      },
      
      clearInputValueStates: function(oEvent) {
         var table = this.getView().byId("exampleForm");
         var content = table.getContent();
         content.forEach(function(control) {
            if (control instanceof sap.m.Input) {
               control.setValueState("None");
               control.closeValueStateMessage();
            }
         });
      },
      setInputValueStates: function(oEvent) {
         var messageTypes = [ "Success", "Information", "Warning", "Error" ]; 
         var pos = 0;
         
         var table = this.getView().byId("exampleForm");
         var content = table.getContent();
         content.forEach(function(control) {
            if (control instanceof sap.m.Input) {
               switch(pos) {
               case 0:
                  control.setValueState("None");
                  break;
               case 1:
                  control.setValueState("Success");
                  break;
               case 2:
                  control.setValueState("Warning");
                  control.setValueStateText("Some warning");
                  control.openValueStateMessage();
                  break;
               case 3:
                  control.setValueState("Error");
                  control.setValueStateText("Some error message");
                  control.openValueStateMessage();
                  break;
               }
               pos++;
            }
         });
      },
      backHome: function() {
         this.getRouter().navTo("home");      
      }
   });

   return msgsController;
});
