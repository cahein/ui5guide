sap.ui.define([
   "oui5lib/controller/BaseController"
], function (Controller) {
   "use strict";

   const sortController = Controller.extend("oum.lib.controller.SortController", {
      _sortModel: null,
      
      getExampleModel: function() {
         let model = sap.ui.getCore().getModel("example");
         if (model === undefined) {
            model = new sap.ui.model.json.JSONModel();
            // model.setDefaultBindingMode("OneWay");
            model.attachRequestCompleted(function() {
               const data = model.getData();
               for (let i = 0, s = data.length; i < s; i++) {
                  const entry = data[i];
                  
                  const orderDate = entry.orderDate;
                  const date = new Date(orderDate);
                  entry.orderDate = date;
                  entry.orderDateStr = date.toDateString();
                  
                  const shipments = entry.shipments;
                  if (shipments.length === 1) {
                     const shipment = shipments[0];
                     const shippedDate = new Date(shipment.date);
                     entry.shippedDate = shippedDate;
                     entry.shippedDateStr = shippedDate.toDateString();
                  }
                  const payments = entry.payments;
                  if (payments.length === 1) {
                     const payment = payments[0];
                     const payDate = new Date(payment.date);
                     entry.payDate = payDate;
                     entry.payDateStr = payDate.toDateString();
                  }
                  
                  switch(entry.status) {
                  case "pending":
                     entry.status = "Pending",
                     entry.valueState = "None";
                     break;
                  case "shipped":
                     entry.status = "Shipped",
                     entry.valueState = "Success";
                     break;
                  case "processing":
                     entry.status = "Processing",
                     entry.valueState = "Warning";
                  case "invoiced":
                     entry.status = "Invoiced",
                     entry.valueState = "Warning";
                     break;
                  case "payment_overdue":
                     entry.status = "Payment Overdue",
                     entry.valueState = "Error";
                     break;
                  }
               }
               model.updateBindings();
               
               sap.ui.getCore().setModel(model, "example");

               const eventBus = sap.ui.getCore().getEventBus();
               eventBus.publish("orders", "loaded", { data: data} );
            });

            setTimeout(function() {
               model.loadData("mockdata/Orders.json");
            }, 2000);
            
         }
         return model;
      },
      
      getSortModel: function() {
         if (this._sortModel !== null) {
            return this._sortModel;
         }
         const sortModel = new sap.ui.model.json.JSONModel();
         sortModel.setData({
            sortOptions: [
               { key: "", name: "Please select a sort option" },
               { key: "customerName", name: "Customer Name"},
               { key: "orderDate", name: "Order Date" },
               { key: "status", name: "Order Status" }
            ],
            firstSortBy: "orderDate",
            firstSortAsc: true,
            secondSortBy: "",
            secondSortAsc: false
         });
         this._sortModel = sortModel;
         
         return sortModel;
      },

      sortBy: function(oController) {
         // 'this' has changed to the control calling the function
         const sortModel = oController.getView().getModel("sort");
         const sortData = sortModel.getData();

         const oSorter= [];
         if (sortData.firstSortBy != "") {
            oController.debug("first sort by: " + sortData.firstSortBy);
            oSorter.push(new sap.ui.model.Sorter(sortData.firstSortBy,
                                                 sortData.firstSortAsc));
         }
         if (sortData.secondSortBy !== "") {
            oController.debug("then sort by: " + sortData.secondSortBy);
            oSorter.push(new sap.ui.model.Sorter(sortData.secondSortBy,
                                                 sortData.secondSortAsc));
         }
         const control = oController.getView().byId("exampleList");
         const binding = control.getBinding("items");
         binding.sort(oSorter);
      }
   });
   return sortController;
});
