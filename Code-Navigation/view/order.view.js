sap.ui.jsview("oum.view.order", {
   getControllerName : function() {
      return "oum.controller.order";
   },
   
   createContent : function(oController) {
      const listTemplate = new sap.m.DisplayListItem({
         label: "{routeData>name}",
         value: "{routeData>value}"
      });
      const oList = new sap.m.List({ width: "200px" });
      oList.bindAggregation("items", "routeData>/params", listTemplate);
      
      const orderPage = new sap.m.Page({
         title: "Explore order routes",
         showNavButton: true,
         navButtonPress: function() {
            oController.backHome();
         },
         content: [
            new sap.m.Title({
               text: "Route matched data"
            }),
            new sap.m.VBox({
               items: [
                  new sap.m.ObjectStatus({ title: "Type", text: "{routeData>/type}" }),
                  new sap.m.ObjectStatus({ title: "OrderId", text: "{routeData>/orderId}" })
               ]
            }),
            oList,
            new sap.m.Title({
               text: "Navigate with router",
               width: "100%"
            }),
            new sap.m.Button({
               text: "Show History",
               press: function() {
                  oController.showHistory();
               }
            }),
            new sap.m.CheckBox({
               text: "No history entry",
               selected: "{/history}"
            }),
            new sap.m.HBox({
               items: [
                  new sap.m.Button({
                     text: "order",
                     press: function() {
                        oController.toOrder("order");
                     }
                  }),
                  new sap.m.Button({
                     text: "order",
                     tooltip:"with id",
                     press: function() {
                        oController.toOrder("order", {
                           id: 41
                        });
                     }
                  }),
                  new sap.m.Button({
                     text: "orderProducts",
                     press: function() {
                        oController.toOrder("orderProducts", {
                           id: "000417"
                        });
                     }
                  }),
                  new sap.m.Button({
                     text: "orderAddress",
                     tooltip: "with id and type",
                     press: function() {
                        oController.toOrder("orderAddress", {
                           id: 4179,
                           type: "billing"
                        });
                     }
                  }),
                  new sap.m.Button({
                     text: "orderAddresses",
                     tooltip: "with id and params", 
                     press: function() {
                        oController.toOrder("orderAddresses", {
                           id: 104179,
                           params: "?type=shipping&mode=edit"
                        });
                     }
                  })
               ]
            })
         ],
         footer: sap.ui.xmlfragment("oum.fragment.AppInfoToolbar")
      });
      return orderPage;
   }
});
