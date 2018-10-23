sap.ui.jsview("oum.view.orders", {
   getControllerName : function() {
      return "oum.controller.orders";
   },
   
   createContent : function(oController) {
      const listitemTemplate = new sap.m.ObjectListItem({
         title: "{billingName}",
         number: "{total}",
         numberUnit: "{currency}",
         type: "Active",
         press: function (oEvent) {
            oController.showOrderDetails(oEvent);
         }
      });

      const dateAttr = new sap.m.ObjectAttribute({
         title: "{i18n>order.orderDate}",
         text: {
            path: "orderDate",
            formatter: function(dateObject) {
               return oController.formatOrderDate(dateObject);
            }
         }
      });
      listitemTemplate.addAttribute(dateAttr);

      const orderStatus = new sap.m.ObjectStatus({
         title: "{i18n>order.status}",
         text: "{statusText}",
         state: "{valueState}"
      });
      listitemTemplate.setFirstStatus(orderStatus);
      
      const itemData = new sap.ui.core.CustomData({ key: "orderId" });
      itemData.bindProperty("value", "id");
      listitemTemplate.addCustomData(itemData);


      const oSorter= [];
      oSorter.push(new sap.ui.model.Sorter("orderDate", true));

      const ordersList = new sap.m.List(this.createId("ordersList"), {
         headerText: "{i18n>ordersPage.list.headerText}",
         growing: true
      });
      ordersList.bindAggregation("items", {
         path: "/",
         template: listitemTemplate,
         sorter: oSorter
      });



      
      const searchField = new sap.m.SearchField({
         width: "150px",
         tooltip: "{i18n>ordersPage.searchField.tooltip}",
         showSearchButton: false,
         liveChange: function(oEvent) {
            oController.searchOrders(oEvent);
         }
      });
      
      const queryToolbar = new sap.m.OverflowToolbar({
         content: [
            searchField,
            new sap.m.Text(this.createId("queryText")),
            new sap.m.ToolbarSpacer(),
            new sap.m.Button(this.createId("toggleFormButton"), {
               icon: "sap-icon://show",
               text: "{i18n>orders.queryForm.button.open}",
               press: function() {
                  oController.toggleQueryForm();
               }
            })
         ]
      });


      const landmarkInfo = new sap.m.PageAccessibleLandmarkInfo({
         rootLabel: "Query and list orders",
         headerRole: "Navigation",
         subHeaderRole: "Search",
         subHeaderLabel: "Filter orders field and toggle order form button",
         contentLabel: "The query form and the list of orders",
         footerRole: "None"
      });
      return new sap.m.Page({
         landmarkInfo: landmarkInfo,
         customHeader: sap.ui.jsfragment("oum.fragment.NavigationHeader", oController),
         showSubHeader: true,
         subHeader: queryToolbar,
         content: [
            new sap.m.VBox(this.createId("messagesContainer")),
            sap.ui.jsfragment("oum.fragment.OrdersQueryForm", oController),
            ordersList
         ]
      });
   }
});
