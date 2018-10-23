sap.ui.jsfragment("oum.fragment.SortToolBar", {
   createContent: function (oController) {
      const sortFirstSelect = new sap.m.Select({
         tooltip: "first sort list by",
         layoutData: new sap.m.OverflowToolbarLayoutData({
            priority: "NeverOverflow"
         }),
         selectedKey: "{sort>/firstSortBy}",
         change: function() {
            oController.sortBy(oController);
         }
      });
      const sortSecondSelect = new sap.m.Select({
         tooltip: "second sort list by",
         selectedKey: "{sort>/secondSortBy}",
         change: function() {
            oController.sortBy(oController);
         }
      });

      const itemTemplate = new sap.ui.core.Item({
         key : "{sort>key}",
         text : "{sort>name}"
      });

       sortFirstSelect.bindAggregation("items", {
         path: "sort>/sortOptions",
         template: itemTemplate
      });
      sortSecondSelect.bindAggregation("items", {
         path: "sort>/sortOptions",
         template: itemTemplate
      });
      
      const sortFirstOrder = new sap.m.CheckBox({
         layoutData: new sap.m.OverflowToolbarLayoutData({
            priority: "High"
         }),
         text: "Descending",
         tooltip: "is first sort order descending",
         selected: "{sort>/firstSortAsc}",
         select: function () {
            oController.sortBy(oController);
         }
      });      
      const sortSecondOrder = new sap.m.CheckBox({
         text: "Descending",
         tooltip: "is second sort order descending",
         selected: "{sort>/secondSortAsc}",
         select: function () {
            oController.sortBy(oController);
         }
      });

      const sortToolBar = new sap.m.OverflowToolbar({
         content: [
            new sap.m.Input({
               width: "120px",
               value: "First sort by",
               enabled: false
            }),
            sortFirstSelect,
            sortFirstOrder,
            new sap.m.ToolbarSeparator(),
            new sap.m.Input({
               width: "120px",
               value: "Then sort by",
               enabled: false
            }),
            sortSecondSelect,
            sortSecondOrder
         ]
      });
      return sortToolBar;
   }
});
