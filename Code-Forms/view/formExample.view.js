jQuery.sap.require("oum.lib.type.Email");

sap.ui.jsview("oum.view.formExample", {
   getControllerName : function() {
      return "oum.controller.formExample";
   },
   createContent : function(oController) {
      // input type String
      const nameType = new sap.ui.model.type.String(
         {},
         {
            maxLength: 20,
            minLength: 3
         }
      );
      const nameInput = new sap.m.Input({
         placeholder: "Please insert your full name",
         value: {
            path: "/name",
            type: nameType
         },
         required: true,
         change: function(oEvent) {
            oController.nameInputChanged(oEvent);
         }
      });

      // custom type Email
      const emailType = new oum.lib.type.Email(
         {},
         {}
      );
      const emailInput = new sap.m.Input({
         value: {
            path: "/email",
            type: emailType
         }
      });

      // input type Integer
      const intType = new sap.ui.model.type.Integer(
         {},
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

      // input type Float
      const floatType = new sap.ui.model.type.Float(
         {
            minFractionDigits: 0,
            maxFractionDigits: 2
         },
         {
             maximum: 10
         }
      );
      const floatInput = new sap.m.Input({
         type: "Number",
         value: {
            path: "/float_example",
            type: floatType
         }
      });


       // input type Currency
      const currencyType = new sap.ui.model.type.Currency(
         {
            minFractionDigits: 2,
            maxFractionDigits: 2,
            currencyCode: false
         },
         {
         }
      );
      const currencyInput = new sap.m.Input({
         value: {
             parts: [
                 { path: "/currency_amount" },
                 { path: "/currency_type" }
             ],
             type: currencyType
         }
      });

      const exampleForm = new sap.ui.layout.form.Form(this.createId("exampleForm"), {
         title: "Example Form with type validation",
         layout: [
            new sap.ui.layout.form.ResponsiveGridLayout()
         ],
         editable: true,
         formContainers: [
            new sap.ui.layout.form.FormContainer({
               formElements: [
                  new sap.ui.layout.form.FormElement({
                     label: "String",
                     fields: [ nameInput ]
                  }),
                  new sap.ui.layout.form.FormElement({
                     label: "Email",
                     fields: [ emailInput ]
                  }),
                  new sap.ui.layout.form.FormElement({
                     label: "Integer/Float",
                     fields: [ intInput, floatInput ]
                  }),
                  new sap.ui.layout.form.FormElement({
                     label: "Currency",
                     fields: [ currencyInput ]
                  }),
               ]
            })
         ]
      });
      
      return new sap.m.Page({
         customHeader: new sap.m.Bar({
            contentMiddle: [
               new sap.m.Text({
                  text: "Form Example"
               })
            ],
            contentRight: [
               sap.ui.jsfragment("oum.fragment.HomeButton", oController)
            ]
         }),
	 content: [ exampleForm ]
      });
   }
});
