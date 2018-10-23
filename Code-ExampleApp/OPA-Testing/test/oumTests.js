jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.qunit.qunit-coverage");

QUnit.config.autostart = false;

sap.ui.require([
   "sap/ui/test/Opa5",
   "sap/ui/test/opaQunit",
   "oum/test/arrangements/Common"
], function (Opa5, opaTest, Common) {

   Opa5.extendConfig({
      arrangements: new Common(),
      autoWait: true
   });

   sap.ui.require([
      "oum/test/entry",
      "oum/test/orders",
      "oum/test/orderNavigation",
      "oum/test/order",
      "oum/test/address"
   ], function() {
      QUnit.module("Orders Page journey");

      opaTest("Should test the orders view", function(Given, When, Then) {
         Given.start_the_app();
         When.on_the_entry_page.press_tile_to_List_of_Orders();
         Then.on_the_orders_page
            .should_be_a_List_of_Orders()
            .should_be_no_queryForm()
            .should_be_a_button_to_show_the_queryForm();         
         When.on_the_orders_page.press_Show_Query_Form();
         Then.on_the_orders_page
            .should_be_a_queryForm()
            .should_be_a_button_to_hide_the_queryForm();
         When.on_the_orders_page
            .enter_a_startDate()
            .press_Hide_Query_Form();
         Then.on_the_orders_page
            .should_be_no_queryForm()
            .and.iTeardownMyAppFrame();
      });

      QUnit.module("New order journey");

      opaTest("Should test the new order Page", function(Given, When, Then) {
         Given.start_the_app();
         When.on_the_entry_page.press_tile_to_New_Order();
         Then.on_the_order_page
            .should_be_one_SimpleForm()
            .should_be_one_empty_Table()
            .should_be_one_Add_Product_Button();
         Then.onOrderNavigationPage
            .should_be_the_New_Order_Title()
            .should_be_the_orderSections_List();
            
         When.onOrderNavigationPage.press_Billing_Address_ListItem();
         Then.onAddressPage
            .should_be_the_Billing_Address_Title()
            .should_be_one_Find_Address_Button()
            .should_be_one_Address_Form()
            .and.iTeardownMyAppFrame();
      });

      QUnit.start();
   });
});
