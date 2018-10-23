sap.ui.jsview("oum.view.listExample", {
   getControllerName : function() {
      return "oum.controller.listExample";
   },
   
   createContent : function(oController) {
      const headerTitle = new sap.m.Text({
         text: "List Example"
      });
      
      const listTemplate = new sap.m.ObjectListItem({
         title: "{customerName}",
         number: "{= parseFloat(${orderTotal}).toFixed(2)}",
         numberUnit: "{currency}",
         type: "Detail",
         detailPress: function (oEvent) {
            oController.handleShowDetail(oEvent);
         }
      });
      const attr = new sap.m.ObjectAttribute({
         title: "Order Date",
         text: "{:= ${orderDate}.getDate()} . {:= ${orderDate}.getFullYear()}"
      });
      listTemplate.addAttribute(attr);

      const orderStatus = new sap.m.ObjectStatus({
         title: "Status",
         text: "{status}",
         state: "{valueState}"
      });
      listTemplate.setFirstStatus(orderStatus);
      
      const itemData = new sap.ui.core.CustomData({
         key: "orderid",
         writeToDom: false
      });
      itemData.bindProperty("value", "id");
      listTemplate.addCustomData(itemData);
      
      const topList = new sap.m.List({
         inset: true,
         showNoData: false,
         headerToolbar: sap.ui.jsfragment("oum.fragment.SortToolBar",
                                          oController)
      });
      const list = new sap.m.List(this.createId("exampleList"), {
         headerToolbar: sap.ui.jsfragment("oum.fragment.SortToolBar",
                                          oController),
         inset: true,
         growing: true,
         growingThreshold: 5, // default 20
         growingScrollToLoad: false,
         growingDirection: "Downwards",
         mode: "SingleSelectMaster",
         selectionChange: function(oEvent) {
            oController.handleItemSelected(oEvent);
         },
         updateStarted: function(oEvent) {
            oController.onUpdateStarted(oEvent);
         },
         footerText: "Example list 'footerText'"
      });

      const listScrollContainer = new sap.m.ScrollContainer({
         height: "100%",
         horizontal: false,
         vertical: true,
         focusable: true,
         content: [ list ]
      });

      const group = function(v) {
         if (v instanceof Date) {
            const month = v.getMonth();
            switch(month) {
            case 0:
               return "January";
               break;
            case 1:
               return "February";
               break;
            case 2:
               return "March";
               break;
            case 3:
               return "April";
               break;
            case 4:
               return "May";
               break;
            case 5:
               return "June";
               break;
            case 6:
               return "July";
               break;
            case 7:
               return "August";
               break;
            case 8:
               return "September";
               break;
            case 9:
               return "October";
               break;
            case 10:
               return "November";
               break;
            case 11:
               return "December";
               break;
            }
         }
         return "Error";
      };
      
      const grouper = function(oContext) {  
         const v = oContext.getProperty("orderDate");
         const month = group(v);  
         return month;
      };
      const initialSorter = new sap.ui.model.Sorter("orderDate",
                                                    true, grouper); 
      list.bindAggregation("items", {
         path: "/",
         template: listTemplate,
         sorter: initialSorter
      });


      const entryPage = new sap.m.Page({
         customHeader: new sap.m.Bar({
            contentLeft: [
               sap.ui.jsfragment("oum.fragment.ListExampleButtons", oController),
            ],
            contentMiddle: [ headerTitle ],
            contentRight: [
               sap.ui.jsfragment("oum.fragment.HomeButton", oController)
            ]
         }),
         // content: [ topList, listScrollContainer ]
         content: [ list ]
      });
      return entryPage;
   }
});
