jQuery.sap.require("oum.lib.type.Email");

sap.ui.jsview("oum.view.simpleFormExample", {
   getControllerName : function() {
      return "oum.controller.formExample";
   },
   createContent : function(oController) {
      const exampleForm = new sap.ui.layout.form.SimpleForm(this.createId("exampleForm"),{
         title: "{i18n>some.form.title}",
         editable: true,
         layout: "ResponsiveGridLayout",
         singleContainerFullSize: false,
         adjustLabelSpan: true,
         labelSpanS: 12,
         labelSpanM: 2,
         labelSpanL: 4,
         labelSpanXL: -1,
         emptySpanS: 0,
         emptySpanM: 0,
         emptySpanL: 1,
         emptySpanXL: -1,
         columnsL: 1,
         columnsM: 1,
         columnsXL: -1
      });

      const nameType = new sap.ui.model.type.String(
         {},
         {
            maxLength: 20,
            minLength: 3
         }
      );
      const nameInput = new sap.m.Input({
         placeholder: "{i18n>name.input.placeholder}",
         value: {
            path: "/name",
            type: nameType
         },
         maxLength: 30,
         width: "300px",
         visible: "{permissions>/name/visible}",
         editable: "{permissions>/name/edit}",
         enabled: "{permissions>/name/enable}",
         change: function(oEvent) {
            oController.nameInputChanged(oEvent);
         },
         liveChange: function(oEvent) {
            oController.nameInputLiveChange(oEvent);
         }
      });

      nameInput.setShowValueHelp(true);
      nameInput.attachValueHelpRequest(function(oEvent) {
         oController.handleHelpRequest(oEvent);
      });

      const nameLabel = new sap.m.Label({
         text: "Name",
         required: true,
         design: "Bold",
         labelFor : nameInput
      });

       const testInput = new sap.m.Input();
      exampleForm.addContent(nameLabel).addContent(nameInput).addContent(testInput);


      const emailType = new oum.lib.type.Email({}, {});
      const emailInput = new sap.m.Input({
         placeholder: "{i18n>email.input.placeholder}",
         value: {
            path: "/email",
            type: emailType
         },
         type: "Email",
         width: "300px"
      });
      const emailLabel = new sap.m.Label({
         text: "Email",
         required: false,
         labelFor : emailInput
      });
      exampleForm.addContent(emailLabel).addContent(emailInput);

      
      const intType = new sap.ui.model.type.Integer({},
                                                  {
                                                     minimum: 3,
                                                     maximum: 10
                                                  }
                                                 );
      const intInput = new sap.m.Input({
         value: {
            path: "/int_example",
            type: intType
         },
         type: "Number"
      });
      const intLabel = new sap.m.Label({
         text: "Integer",
         required: true,
         labelFor : intInput
      });
      exampleForm.addContent(intLabel).addContent(intInput);

      const phoneInput = new sap.m.Input({
         value: {
            path: "/phone_example"
         },
         type: "Tel"
      });
      const phoneLabel = new sap.m.Label({
         text: "Phone",
         labelFor : phoneInput
      });
      exampleForm.addContent(phoneLabel).addContent(phoneInput);

      const passwordInput = new sap.m.Input({
         value: {
            path: "/password"
         },
         type: "Password"
      });
      const passwordLabel = new sap.m.Label({
         text: "Password",
         labelFor : passwordInput
      });
      exampleForm.addContent(passwordLabel).addContent(passwordInput);

      const floatType = new sap.ui.model.type.Float(
         {
            minFractionDigits: 2,
            maxFractionDigits: 2    		
         },
         {
            maximum: 10
         }
      );
      const floatInput = new sap.m.Input({
         value: {
            path: "/float_example",
            type: floatType
         },
         description: "m",
         width: "120px"
      });
      const floatLabel = new sap.m.Label({
         text: "Float",
         labelFor : floatInput
      });
      exampleForm.addContent(floatLabel).addContent(floatInput);

      const maskInputText = new sap.ui.core.InvisibleText({
         text: "First we expect two digits followed by to lower case letters"
      });

      const maskInput = new sap.m.MaskInput({
         width: "120px",
         value: "{/maskInputValue}",
         mask: "dd ll",
         rules: [
            new sap.m.MaskInputRule({
               maskFormatSymbol: "d",
               regex: "[0-9]"
            }),
            new sap.m.MaskInputRule({
               maskFormatSymbol: "l",
               regex: "[a-z]"
            })
         ],
         ariaLabelledBy: maskInputText
      });
      const maskInputLabel = new sap.m.Label({
         text: "MaskInput",
         labelFor : maskInput
      });
      exampleForm.addContent(maskInputLabel).addContent(maskInput);

      const oSwitch = new sap.m.Switch({
         state: "{/switchState}",
         tooltip: "Switch control. True or false.",
         type: "AcceptReject",
         change : function() {
            // setRecordChanged
         }
      });
      const oaSwitch = new sap.m.Switch({
         state: "{/switchState}",
         tooltip: "Switch control. True or false.",
         type: "Default",
         change : function() {
            // setRecordChanged
         }
      });
      const ooSwitch = new sap.m.Switch({
         state: "{/switchState}",
         tooltip: "Switch control. True or false.",
         type: "Default",
         customTextOn: "Run",
         customTextOff: "Stop",
         change : function() {
            // setRecordChanged
         }
      });
      const switchLabel = new sap.m.Label({
         text: "Switch",
         labelFor : oSwitch
      });
      exampleForm.addContent(switchLabel).addContent(oSwitch).addContent(oaSwitch).addContent(ooSwitch);

      const checkBox = new sap.m.CheckBox({
         selected : "{/checkboxState}",
         tooltip: "Checkbox control. Select or unselect.",
         name: "checkMe",
         text: "some text",
         textAlign: "Begin",
         select : function() {
            // setRecordChanged();
         }
      });
      const checkBoxLabel = new sap.m.Label({
         text: "CheckBox",
         labelFor : checkBox
      });
      exampleForm.addContent(checkBoxLabel).addContent(checkBox);

      const autocompleteInput = new sap.m.Input({
         width: "300px",
         value: {
            path: "/element"
         }
      });
      autocompleteInput.setShowSuggestion(true);
      const autocompleteItemTemplate = new sap.ui.core.Item({
         key : "{name}",
         text : "{name}"
      });
      autocompleteInput.bindAggregation("suggestionItems", {
         path: "/suggestedNames",
         template: autocompleteItemTemplate
      });
      
      const autocompleteInputLabel = new sap.m.Label({
         text: "Autocomplete Input",
         labelFor: autocompleteInput
      });
      exampleForm.addContent(autocompleteInputLabel).addContent(autocompleteInput);


      const radioGroup =  new sap.m.RadioButtonGroup({
         columns: 4,
         selectedIndex: 0,
         select: function(oEvent) {
            oController.radioButtonSelected(oEvent);
         }
      });
      const radioTemplate = new sap.m.RadioButton({
         text: "{sText}",
         enabled: "{enabled}",
         editable: "{editable}"
      });
      radioGroup.bindAggregation("buttons", {
         path: "/cb",
         template: radioTemplate
      });

      const radioGroupLabel = new sap.m.Label({
         text: "RadioButtonGroup",
         labelFor: radioGroup
      });
      exampleForm.addContent(radioGroupLabel).addContent(radioGroup);
      
      const cbNameType = new sap.ui.model.type.String({},
                                                    {
                                                       maxLength: 3,
                                                       minLength: 1
                                                    }
                                                   );

      const comboBox = new sap.m.ComboBox({
         width: "300px",
         placeholder: "Please select an entry. Type to search.",
         selectedKey: {
            path: "/cbSelected",
            type: cbNameType
         },
         selectionChange: function() {
            oui5lib.logger.debug(comboBox.getSelectedKey());
         },
         change : function() {
            oui5lib.logger.debug("changed:" + comboBox.getValue());
            oController.checkComboBox(comboBox);
         }
      });

      const multiComboBox = new sap.m.MultiComboBox({
         width: "200px",
         placeholder: "Please select entries. Type to search.",
         selectedKeys: "{/mcbSelected}"
      });
      
      const itemTemplate = new sap.ui.core.Item({
         key : "{sKey}",
         text : "{sText}"
      });

      // sorter
      const oSorter= new sap.ui.model.Sorter("sText", false);
      comboBox.bindAggregation("items",  "/cb", itemTemplate, oSorter);

      const comboBoxLabel = new sap.m.Label({
         text: "ComboBox",
         labelFor : comboBox
      });
      exampleForm.addContent(comboBoxLabel).addContent(comboBox);

      multiComboBox.bindAggregation("items",  "/cb", itemTemplate, oSorter);
      const multiComboBoxLabel = new sap.m.Label({
         text: "MultiComboBox",
         design: "Bold",
         labelFor : multiComboBox
      });
      exampleForm.addContent(multiComboBoxLabel).addContent(multiComboBox);
      
      const select = new sap.m.Select({
         width: "300px",
         textAlign: "Begin",
         autoAdjustWidth: true,
         forceSelection: true,
         selectedKey: "{/sSelected}",
         change : function() {}
      });
      const selectLabel = new sap.m.Label({
         text: "Select",
         labelFor : select
      });
      select.bindAggregation("items",  "/aSelect", itemTemplate);
      exampleForm.addContent(selectLabel).addContent(select);

      const textArea = new sap.m.TextArea({
         placeholder: "Please describe",
         value: {
            path: "/description"
         },
         maxLength: 200,
         rows: 2,
         cols: 20,
         growing: true,
         change: function() {}
      });
      const textAreaLabel = new sap.m.Label({
         text: "TextArea",
         labelFor : textArea
      });
      exampleForm.addContent(textAreaLabel).addContent(textArea);

      const datePicker = new sap.m.DatePicker({
         valueFormat: "yyyy-MM-dd",
         displayFormat: "short",
         dateValue : "{/date}",
         change: function() {}
      });
      const datePickerLabel = new sap.m.Label({
         text: "DatePicker",
         labelFor : datePicker
      });
      exampleForm.addContent(datePickerLabel).addContent(datePicker);

      const dateTimePicker = new sap.m.DateTimePicker({
         dateValue : "{/date}",
         change: function() {}
      });
      const dateTimePickerLabel = new sap.m.Label({
         text: "DateTimePicker",
         labelFor : dateTimePicker
      });
      exampleForm.addContent(dateTimePickerLabel).addContent(dateTimePicker);

      const dateRange = new sap.m.DateRangeSelection({
         from: "{/fromDate}",
         to: "{/toDate}",
         change: function() {}
      });
      
      const dateRangeLabel = new sap.m.Label({
         text: "DateRangeSelection",
         labelFor : dateRange
      });
      exampleForm.addContent(dateRangeLabel).addContent(dateRange);

      const timePicker = new sap.m.TimePicker({
         valueFormat: "HH:mm",
         displayFormat: "HH:mm",
         dateValue : "{/date}",
         change: function() {}
      });
      const timePickerLabel = new sap.m.Label({
         text: "TimePicker",
         labelFor : timePicker
      });
      exampleForm.addContent(timePickerLabel).addContent(timePicker);

      
      const headerTitle = new sap.m.Text({
         text: "SimpleForm Example"
      });
      return new sap.m.Page({
         customHeader: new sap.m.Bar({
            contentMiddle: [ headerTitle ],
            contentRight: [
               sap.ui.jsfragment("oum.fragment.HomeButton", oController)
            ]
         }),
	 content: [ maskInputText, exampleForm ]
      });
   }
});
