sap.ui.jsview("oum.view.tableExample", {
   getControllerName : function() {
      return "oum.controller.listExample";
   },
   
   createContent: function(oController) {
      const filterList = new sap.m.FacetFilterList({
         title: "{title}",
         key: "{key}"
      });
      const filterItem = new sap.m.FacetFilterItem({
         key: "{key}",
         text: "{text}"
      });
      filterList.bindAggregation("items", {
         path: "values/",
         template: filterItem,
         templateShareable: false
      });

      const facetFilter = new sap.m.FacetFilter(this.createId("exampleFacetFilter"), {
         type: "Simple",
         showPersonalization: true,
         showPopoverOKButton: true,
         confirm: function(oEvent) {
            oController.filterByFacet(oEvent);
         },
         reset: function(oEvent) {
            oController.resetFacetFilter(oEvent);
         }
      });
      facetFilter.bindAggregation("lists", {
         path: "/",
         template: filterList
      });

      const tableLabelledBy = new sap.ui.core.InvisibleText({
         text: "This is just an example table"
      });
      const sortToolbar = sap.ui.jsfragment("oum.fragment.SortToolBar",
                                            oController);
      
      const oTable = new sap.m.Table(this.createId("exampleList"), {
         ariaLabelledBy: tableLabelledBy,
         growing: true,
         growingThreshold: 5, // default 20
         headerToolbar: sortToolbar,
         infoToolbar: new sap.m.Toolbar({
            design: "Transparent",
            content: [
               new sap.m.Text({
                  text: "Filter by: "
               }),
               facetFilter
            ]
         }),
         mode: "None",
         updateStarted: function(oEvent) {
            oController.onUpdateStarted(oEvent);
         },
         updateFinished: function(oEvent) {
            oController.onUpdateFinished(oEvent);
         },
         columns: [
            new sap.m.Column({
               header: new sap.m.Label({
                  text: "ID"
               })
            }),
            new sap.m.Column({
               width: "120px",
               header: new sap.m.Label({
                  text: "Customer Name"
               })
            }),
            new sap.m.Column({
               width: "50px",
               hAlign: sap.ui.core.TextAlign.End,
               header: new sap.m.Label({
                  text: "Total"
               }),
               footer: new sap.m.Text({
                  text: "Total"
               })
            }),
            new sap.m.Column({
               demandPopin: true,
               minScreenWidth: "Tablet",
               header: new sap.m.Label({
                  text: "Currency"
               })
            }),
            new sap.m.Column({
               demandPopin: true,
               popinDisplay: "Inline",
               minScreenWidth: "Small",
               header: new sap.m.Label({
                  text: "Order Date"
               })
            }),
            new sap.m.Column({
               minScreenWidth: "Tablet",
               header: new sap.m.Label({
                  text: "Payment Date"
               })
            }),
            new sap.m.Column({
               minScreenWidth: "Tablet",
               header: new sap.m.Label({
                  text: "Ship Date"
               })
            }),
            new sap.m.Column({
               header: new sap.m.Label({
                  text: "Status"
               })
            })
         ]
      });
      const rowTemplate = new sap.m.ColumnListItem({
         type: "Navigation",
         press: function(oEvent) {
            oController.handleRowPressed(oEvent);
         },
         cells: [
            new sap.m.Text({
               text: "{id}"
            }),
            new sap.m.Text({
               text: "{customerName}"
            }),
            new sap.m.Text({
               text: {
                  path: "orderTotal",
                  formatter: function(value) {
                     return value.toFixed(2);
                  }
               }
            }),
            new sap.m.Text({
               text: "{currency}",
               textAlign: "End"
            }),
            new sap.m.Text({
               text: "{orderDateStr}"
            }),
            new sap.m.Text({
               text: "{payDateStr}"
            }),
            new sap.m.Text({
               text: "{shippedDateStr}"
            }),
            new sap.m.ObjectStatus({
               text: "{status}",
               state: "{valueState}"
            })
         ]
      });
      
      const itemData = new sap.ui.core.CustomData({
         key: "orderid",
         writeToDom: false
      });
      itemData.bindProperty("value", "id");
      rowTemplate.addCustomData(itemData);

      const oSorter = new sap.ui.model.Sorter("orderDate",
                                            true);
      oTable.bindAggregation("items", {
         path: "/",
         template: rowTemplate,
         sorter: oSorter
      });

      
      const entryPage = new sap.m.Page({
         customHeader: new sap.m.Bar({
            contentLeft: [
               sap.ui.jsfragment("oum.fragment.ListExampleButtons", oController),
            ],
            contentMiddle: [
               new sap.m.Text({
                  text: "Table Example"
               })
            ],
            contentRight: [
               sap.ui.jsfragment("oum.fragment.HomeButton", oController)
            ]
         }),
         content: [ tableLabelledBy, oTable ]
      });
      return entryPage;
   }
});
