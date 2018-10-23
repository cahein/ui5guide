sap.ui.require([
   "sap/ui/test/Opa5",
   "sap/ui/test/opaQunit",
   "sap/ui/test/matchers/PropertyStrictEquals",
], function (Opa5, opaTest, PropertyStrictEquals) {
   Opa5.createPageObjects({
      viewName: "oum.view.address",
      onAddressPage: {
         assertions: {
            should_be_the_Billing_Address_Title: function () {
               return this.waitFor({
                  controlType: "sap.m.Title",
                  matchers: [
                     new PropertyStrictEquals({
                        name: "text",
                        value: "Billing Address"
                     })
                  ],
                  success: function(titles) {
                     assert.equal(titles.length, 1);
                  }
               });
            },
            should_be_one_Find_Address_Button: function () {
               return this.waitFor({
                  controlType: "sap.m.Button",
                  matchers: new PropertyStrictEquals({
                     name: "text",
                     value: "Find an address"
                  }),
                  success: function(buttons) {
                     assert.equal(buttons.length, 1);
                  }
               });
            },
            should_be_one_Address_Form: function () {
               return this.waitFor({
                  controlType: "sap.ui.layout.form.SimpleForm",
                  success: function(simpleForms) {
                     assert.equal(simpleForms.length, 1);
                  }
               });
            }
         }
      }
   });
});
