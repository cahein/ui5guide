sap.ui.jsview("oum.view.messages", {
   getControllerName : function() {
      return "oum.controller.messages";
   },
   createContent : function(oController) {
      const messageTemplate = new sap.m.MessageItem({
         type: "{type}",
         title: "{title}",
         subtitle: "{subtitle}",
         description: "{description}",
         groupName: "{group}"
      });
      
      const messagePopover = new sap.m.MessagePopover(this.createId("messagePopover"));
      messagePopover.bindAggregation("items", {
         path: "/",
         template: messageTemplate
      });
                                     
      const messageView = new sap.m.MessageView(this.createId("messageView"), {
	 showDetailsPageHeader: false,
	 groupItems: true
      });
      messageView.bindAggregation("items", {
         path: "/",
         template: messageTemplate
      });

      const messagesPage = new sap.m.Page({
         title: "Explore messages",
         showNavButton: true,
         navButtonPress: function() {
            oController.backHome();
         },
         content: [
            new sap.m.HBox({
               items: [
                  new sap.m.Button({
                     text: "Show notification",
                     press: function() {
                        oController.showNotification();
                     }
                  }),
                  new sap.m.Button({
                     text: "Show error message",
                     press: function() {
                        oController.showErrorMessage();
                     }
                  }),
                  new sap.m.Button({
                     text: "Confirm unsaved changes",
                     press: function() {
                        oController.showConfirmUnsavedChanges();
                     }
                  }),
                  new sap.m.Button({
                     text: "Confirm delete",
                     press: function() {
                        oController.showConfirmDelete();
                     }
                  }),
                  new sap.m.Button({
                     text: "Show MessageStrips",
                     press: function() {
                        oController.showMessageStrips();
                     }
                  }),
                  new sap.m.Button({
                     text: "Msgs Pop",
                     press: function(oEvent) {
                        oController.simulateMessages(oEvent);
                     }
                  }),
                  new sap.m.Button({
                     text: "Msgs Dia",
                     press: function() {
                        oController.openMessagesDialog();
                     }
                  })
               ]
            }),
            new sap.m.VBox(this.createId("messagesContainer")),
            new sap.ui.layout.form.SimpleForm(this.createId("exampleForm"), {
               toolbar: new sap.m.OverflowToolbar({
                  content: [
                     new sap.m.Title({
                        text: "Example Input ValueStateMessages"
                     }),
                     new sap.m.Button({
                        text: "Set Input ValueStates",
                        press: function(oEvent) {
                           oController.setInputValueStates(oEvent);
                        }
                     }),
                     new sap.m.Button({
                        text: "Clear Input ValueStates",
                        press: function(oEvent) {
                           oController.clearInputValueStates(oEvent);
                        }
                     })
                  ]
               }),
               content: [
                  new sap.m.Label({
                     text: "ValueState 'None'"
                  }),
                  new sap.m.Input({
                     value: "{/firstInput}"
                  }),
                  new sap.m.Label({
                     text: "ValueState 'Success'"
                  }),
                  new sap.m.Input({
                     value: "{/secondInput}"
                  }),
                  new sap.m.Label({
                     text: "ValueState 'Warning'"
                  }),
                  new sap.m.Input({
                     value: "{/thirdInput}"
                  }),
                  new sap.m.Label({
                     text: "ValueState 'Error'"
                  }),
                  new sap.m.Input({
                     value: "{/forthInput}"
                  })
               ]
            })
         ],
         footer: new sap.m.Bar({
            contentLeft: [
               new sap.m.Button({
                  icon: "sap-icon://message-popup",
                  text: "{msgs>/messages_count}",
                  type: "{msgs>/messages_buttonType}",
                  press: function(oEvent) {
                     oController.showMessagePopover(oEvent);
                  }
               })
            ]
         })
      });
      return messagesPage;
   }
});
