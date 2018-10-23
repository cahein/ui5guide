sap.ui.jsview("oum.view.order", {
   getControllerName : function() {
      return "oum.controller.order";
   },
   
   createContent : function(oController) {
      const form = new sap.ui.layout.form.SimpleForm(this.createId("orderForm"), {
         editable: true,
         layout: "ResponsiveGridLayout",
         labelSpanM: 3,
         labelSpanL: 2
      });

      const orderDate = oController.addDateTimePicker(form, "order", "orderDate");
      orderDate.setEditable(false);
      orderDate.bindProperty("visible", "state>/saved");
      
      let input = oController.addInput(form, "order", "billingName");
      input.setEditable(false);

      const shiptoBillingAddressCheckBox =
            sap.ui.jsfragment("oum.fragment.ShiptoBillingAddressCheckBox", oController);
      form.addContent(shiptoBillingAddressCheckBox);
      
      input = oController.addInput(form, "order", "shippingName");
      input.setEditable(false);
      input.bindProperty("visible", "common>/hideShippingAddress");
      
      const select = oController.addSelect(form, "order", "status");
      select.bindProperty("enabled", "state>/statusChangeable");
      
      input = oController.addInput(form, "order", "total");
      input.setEditable(false);


      const orderLinesTable = new sap.m.Table(this.createId("orderLinesTable"), {
         headerText: "{i18n>order.itemsList.header}",
         
         mode: "Delete",
         delete: function(oEvent) {
            oController.deleteOrderLine(oEvent);
         },
         alternateRowColors: true,   
         columns: [
            new sap.m.Column({
               width: "100px",
               header: new sap.m.Label({
                  text: "Product ID"
               })
            }),
            new sap.m.Column({
               demandPopin: true,
               minScreenWidth: "Tablet",
               header: new sap.m.Label({
                  text: "Product Title"
               })
            }),
            new sap.m.Column({
               width: "80px",
               header : new sap.m.Label({
                  text: "Quantity"
               })
            }),
            new sap.m.Column({
               width: "80px",
               hAlign: "End",
               header : new sap.m.Label({
                  text: "Unit Price"
               })
            }),
            new sap.m.Column({
               demandPopin: true,
               popinDisplay: "Inline",
               minScreenWidth: "Tablet",
               width: "80px",
               hAlign: "End",
               header: new sap.m.Label({
                  text: "Total"
               })
            })
         ]
      });
      const rowTemplate = new sap.m.ColumnListItem({
         cells : [
            new sap.m.Text({
               text: "{orderLines>productId}"
            }),
            new sap.m.Text({
               text: "{orderLines>productName}"
            }),
            new sap.m.Input({
               value: "{orderLines>quantity}",
               type: "Number",
               editable: "{status>/editable}",
               change: function(oEvent) {
                  oController.handleLineQuantityChanged(oEvent);
               }
            }),
            new sap.m.Text({
               text: "{orderLines>unitPrice}"
            }),
            new sap.m.Text({
               text: "{orderLines>lineTotal}"
            })
         ]
      });
      orderLinesTable.setInfoToolbar(
         new sap.m.Toolbar({
            content: [
               new sap.m.Button({
                  text: "{i18n>order.addItem}",
                  tooltip: "{i18n>order.addItem.tooltip}",
                  enabled: "{status>/editable}", 
                  press: function() {
                     oController.openProductDialog();
                  }
               })
            ]
         })
      );
      orderLinesTable.bindAggregation("items", {
         path: "orderLines>/",
         template: rowTemplate
      });
       
      return new sap.m.Page({
         customHeader: sap.ui.jsfragment("oum.fragment.NavigationHeader", oController),
         content: [
            new sap.m.VBox(this.createId("messagesContainer")),
            form, orderLinesTable
         ],
         footer: sap.ui.jsfragment("oum.fragment.CancelAndSaveBar", oController)
      });
   }
});
