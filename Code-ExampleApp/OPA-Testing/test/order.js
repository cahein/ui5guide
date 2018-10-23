sap.ui.require([
   "sap/ui/test/Opa5",
   "sap/ui/test/opaQunit",
   "sap/ui/test/matchers/Properties",
   "sap/ui/test/matchers/AggregationEmpty"
], function (Opa5, opaTest, Properties, AggregationEmpty) {
   Opa5.createPageObjects({
      viewName: "oum.view.order",
      on_the_order_page: {
         assertions: {
            should_be_one_SimpleForm: function () {
               return this.waitFor({
                  controlType: "sap.ui.layout.form.SimpleForm",
                  success: function(simpleForms) {
                     assert.equal(simpleForms.length, 1);
                  }
               });
            },
            should_be_one_empty_Table: function () {
               return this.waitFor({
                  controlType: "sap.m.Table",
                  matchers: [
                     new Properties({
                        headerText: "Ordered items:",
                        mode: "Delete"
                     }),
                     new AggregationEmpty({
                        name: "items"
                     })
                  ],
                  success: function(tables) {
                     assert.equal(tables.length, 1);
                  }
               });
            },
            should_be_one_Add_Product_Button: function () {
               return this.waitFor({
                  controlType: "sap.m.Button",
                  matchers: new Properties({
                     text: "Add product"
                  }),
                  success: function(buttons) {
                     assert.equal(buttons.length, 1);
                  }
               });
            }
         }
      }
   });
});
