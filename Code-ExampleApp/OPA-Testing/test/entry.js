sap.ui.define([
   "sap/ui/test/Opa5",
   "sap/ui/test/actions/Press",
   "sap/ui/test/matchers/Properties"
], function(Opa5, Press, Properties){
   "use strict";

   const pressTile = function(headerText){
      return this.waitFor({
         controlType: "sap.m.GenericTile",
         matchers: new Properties({
            header: headerText
         }),
         actions: new Press(),
         errorMessage: "Didn't find GenericTile with headerText: " + headerText
      });
   };

   Opa5.createPageObjects({
      viewName: "oum.view.entry",
      on_the_entry_page: {
         actions: {
            press_tile_to_List_of_Orders: function () {
               return pressTile.call(this, "List of Orders");
            },
            press_tile_to_New_Order: function () {
               return pressTile.call(this, "Create a new Order");
            }
         }
      }
   });
});
