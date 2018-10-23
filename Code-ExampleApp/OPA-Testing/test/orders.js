sap.ui.require([
   "sap/ui/test/Opa5",
   "sap/ui/test/actions/Press",
   "sap/ui/test/matchers/Properties",
   "sap/ui/test/matchers/LabelFor",
   "sap/ui/test/actions/EnterText"
], function (Opa5, Press, Properties, LabelFor, EnterText) {
   const getToggleQueryFormButtonProperties = function(text) {
      return {
         controlType: "sap.m.Button",
         matchers: new Properties({
            text: text + " Query Form",
            icon: "sap-icon://" + text.toLowerCase()
         })
      };
   };
   const checkQueryFormButton = function(text){
      const buttonProperties = getToggleQueryFormButtonProperties(text);
      
      buttonProperties.success = function(buttons) {
         assert.equal(buttons.length, 1,
                      "Page should have exactly one Button to " + text + " the query form");
      };
      buttonProperties.errorMessage = "Missing the button to " + text + " the query form";
      return this.waitFor(buttonProperties);
   };
   const toggleQueryForm = function(text) {
      const buttonProperties = getToggleQueryFormButtonProperties(text);
      buttonProperties.actions = new Press();
      return this.waitFor(buttonProperties);
   };

   const isQueryFormVisible = function(isVisible){
      return this.waitFor({
         controlType: "sap.ui.layout.form.Form",
         matchers: new Properties({
            visible: isVisible
         }),
         visible: false,
         success: function(forms) {
            const form = forms[0];
            assert.equal(form.getToolbar().getContent()[0].getText(),
                         "Change Query Parameters",
                         "Query form visible: " + isVisible);
         },
         errorMessage: "missing the query form" 
      });
   };

   
   Opa5.createPageObjects({
      viewName: "oum.view.orders",
      on_the_orders_page: {
         actions: {
            press_Show_Query_Form: function () {
               return toggleQueryForm.call(this, "Show");
            },
            press_Hide_Query_Form: function () {
               return toggleQueryForm.call(this, "Hide");
            },
            enter_a_startDate: function () {
               return this.waitFor({
                  controlType: "sap.m.DatePicker",
                  matchers: [
                     new LabelFor({
                        text: "From"
                     })
                  ],
                  actions: new EnterText({
                     text: "Oct 15, 2018"
                  })
               });
            }
         },
         assertions: {
            should_be_a_List_of_Orders: function() {
               return this.waitFor({
                  controlType: "sap.m.List",
                  matchers: new Properties({
                     headerText: "List of Orders"
                  }),
                  success: function(lists) {
                     assert.ok(true, "Page has orders List");
                  }
               });
            },
            should_be_a_button_to_show_the_queryForm: function() {
               return checkQueryFormButton.call(this, "Show");
            },
            should_be_a_button_to_hide_the_queryForm: function() {
               return checkQueryFormButton.call(this, "Hide");
            },
            should_be_no_queryForm: function() {
               return isQueryFormVisible.call(this, false);
            },
            should_be_a_queryForm: function() {
               return isQueryFormVisible.call(this, true);
            }
         }
      }
   });
});
