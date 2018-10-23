sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

   const exampleFormController = Controller.extend("oum.controller.formExample", {
      onInit: function () {
  //       sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);

         const model = new sap.ui.model.json.JSONModel();
         model.setData({
            name: "Carsten Heinrigs",
            maskInputValue: "",
            address_street: "Am Dobben",
            address_number: "33",
            float_example: 2.54421,
            currency_amount: 16.10,
            currency_type: "USD",
            int_example: null,
            phone_example: null,
            password: "",
            date: new Date(),
            fromDate: null,
            toDate: null,
            description: "",
            switchState: true,
            checkboxState: true,
            cb: [
               { sKey: "1", sText: "Air", enabled: true, editable: true },
               { sKey: "2", sText: "Water", enabled: true, editable: true },
               { sKey: "3", sText: "Earth", enabled: true, editable: false },
               { sKey: "4", sText: "Fire", enabled: false, editable: true }
            ],
            cbSelected: "2",
            mcbSelected: ["2", "4"],
            aSelect: [
               { sKey: null, sText: "Select an item" },
               { sKey: "1", sText: "Air" },
               { sKey: "2", sText: "Water" },
               { sKey: "3", sText: "Earth" },
               { sKey: "4", sText: "Fire" }
            ],
            sSelected: null,
            suggestedNames: [
               { name: "Air" },
               { name: "Earth" },
               { name: "Water" },
               { name: "Fire" }
            ],
            element: ""
         });
         const form = this.getView().byId("exampleForm");
         form.setModel(model);

         const permissionsModel = new sap.ui.model.json.JSONModel();
         permissionsModel.setData({
            "name": {
               "visible": true,
               "enable": true,
               "edit": true
            }
         });
         form.setModel(permissionsModel, "permissions");
      },

      nameInputChanged: function(oEvent) {
         const value = oEvent.getParameter("value");
         this.debug("value: " + value);

         const eventId = oEvent.getId();
         const input = oEvent.getSource();
         this.debug("input value: " + input.getValue());
      },
      nameInputLiveChange: function(oEvent) {
         if (!oEvent.getParameter("escPressed")) {
            const value = oEvent.getParameter("value");
            this.debug("liveChange: " + value);

            const input = oEvent.getSource();
            this.debug("input liveValue: " + input.getValue());
         } else {
            this.debug("input escaped");
         }
      },

      handleHelpRequest: function(oEvent) {
         const eventId = oEvent.getId();
         const eventSource = oEvent.getSource();
         oui5lib.logger.debug("eventId: " + eventId);
         const controlId = eventSource.getId();
         oui5lib.logger.debug("controlId: " + controlId);
	 const value = eventSource.getValue();
         oui5lib.logger.debug("value: " + value);
      },

      radioButtonSelected: function(oEvent) {
         const radioGroup = oEvent.getSource();
         const selectedButton = radioGroup.getSelectedButton();
         const selectedId = selectedButton.getId();
         oui5lib.logger.debug("selected id: " + selectedId);
      },
      
      checkComboBox: function(comboBox) {
         const vlue = comboBox.getValue();
         const selectedItem = comboBox.getSelectedItem();
         if (selectedItem === null) {
            if (!oui5lib.validation.isBlank(vlue)) {
               comboBox.setValueState("Warning");
               const valueText = oui5lib.util.getI18nText("common.combobox.noItemSelected");
               comboBox.setValueStateText(valueText);
               comboBox.openValueStateMessage();
               return;
            }
         }
         comboBox.setValueState("None");
      }

      
   });
   
   return exampleFormController;
});
