sap.ui.require([
   "sap/ui/test/Opa5",
   "sap/ui/test/opaQunit",
   "sap/ui/test/actions/Press",
   "sap/ui/test/matchers/Properties",
   "sap/ui/test/matchers/AggregationLengthEquals",
], function (Opa5, opaTest, Press, Properties, AggregationLengthEquals) {
   Opa5.createPageObjects({
      viewName: "oum.view.orderNavigation",
      onOrderNavigationPage: {
         actions: {
            press_Billing_Address_ListItem: function() {
               return this.waitFor({
                  controlType: "sap.m.StandardListItem",
                  matchers: new Properties({
                     title: "Billing Address"
                  }),
                  actions: new Press()
               });
            }
         },
         assertions: {
            should_be_the_New_Order_Title: function () {
               return this.waitFor({
                  controlType: "sap.m.Title",
                  matchers: new Properties({
                     text: "New Order"
                  }),
                  success: function(titles) {
                     assert.equal(titles.length, 1);
                  }
               });
            },
            should_be_the_orderSections_List: function () {
               return this.waitFor({
                  controlType: "sap.m.List",
                  matchers: [
                     new Properties({
                        mode: "SingleSelectMaster"
                     }),
                     new AggregationLengthEquals({
                        name: "items",
                        length: 3
                     })
                  ],
                  success: function(lists) {
                     assert.equal(lists.length, 1);

                     const list = lists[0];
                     assert.notOk(list.getItems()[2].isActive());
                  }
               });
            }
         }
      }
   });
});
