sap.ui.define([
   "oum/lib/controller/SortController"
], function(Controller) {
   "use strict";

   const listExampleController = Controller.extend("oum.controller.listExample", {
      onInit: function () {
         const model = this.getExampleModel();
         const list = this.getView().byId("exampleList");
         list.setModel(model);
         
         this.getView().setModel(this.getSortModel(), "sort");

         const facetFilter = this.getView().byId("exampleFacetFilter");
         if (typeof facetFilter !== "undefined") {
            const facetFilterData = [
               {
                  title: "Customer Name",
                  key: "customerAddressId",
                  values: []
               },
               {
                  title: "Order Status",
                  key: "status",
                  values: []
               }
            ];
            const facetModel = new sap.ui.model.json.JSONModel(facetFilterData);
            facetFilter.setModel(facetModel);
         }

         const eventBus = sap.ui.getCore().getEventBus();
         eventBus.subscribe("orders", "loaded", this.updateFacetFilterModel, this);
      },
      
      handleItemSelected: function(oEvent) {
         const selectedItem = oEvent.getParameter("listItem");
         const bindingContext = selectedItem.getBindingContext();
         const data = bindingContext.getModel()
             .getProperty(bindingContext.getPath());

         console.log(data);
         this.info("item selected: " + selectedItem.data("orderid"));
      },
      
      handleShowDetail: function(oEvent) {
         const item = oEvent.getSource();
         const name = item.getTitle();
         const number = item.getNumber();
         this.info("show detail requested: " + name + "-" + number);
      },

      handleRowPressed: function(oEvent) {
         const selectedItem = oEvent.getSource();
         const bindingContext = selectedItem.getBindingContext();
         const data = bindingContext.getModel()
             .getProperty(bindingContext.getPath());
         console.log(data);
         
         this.info("item selected: " + selectedItem.data("orderid"));
      },

      filterByFacet: function(oEvent) {
         const facetFilter = oEvent.getSource();
         const filterLists = facetFilter.getLists();
         const activeLists = [];
         filterLists.forEach(function(filterList) {
            if (filterList.getSelectedItems().length > 0) {
               activeLists.push(filterList);
            }
         });
         const filters = new sap.ui.model.Filter({
            filters: activeLists.map(
               function(filterList) {
                  return new sap.ui.model.Filter({
                     filters: filterList.getSelectedItems().map(
                        function(selectedItem) {
                           return new sap.ui.model.Filter({
                              path: filterList.getKey(),
                              operator: "EQ",
                              value1: selectedItem.getKey()
                           });
                        }),
                     and: false
                  });
               }),
            and: true
         });
         this.filterList(filters);

         filterLists.forEach(function(filterList) {
            if (activeLists.indexOf(filterList) === -1) {
               console.log("inactive filter: " + filterList.getKey());
            }
         });
      },
      resetFacetFilter: function(oEvent) {
         const facetFilter = oEvent.getSource();
         const filterLists = facetFilter.getLists();
         filterLists.forEach(function(filterList) {
            filterList.setSelectedKeys();
         });
         this.filterList([]);
      },
      filterList: function(filters) {
         const list = this.getView().byId("exampleList");
         list.getBinding("items").filter(filters);
      },
      
      onUpdateStarted: function(oEvent) {
         this.debug("updateStarted: " + oEvent.getParameter("reason"));
         console.log(oEvent.getParameter("actual") + ":"
                     + oEvent.getParameter("total"));
      },
      
      onUpdateFinished: function(oEvent) {
         this.debug("updateFinished");
      },

      updateFacetFilterModel: function(channelId, eventId, obj) {
         const data = obj.data;

         const facetFilter = this.getView().byId("exampleFacetFilter");
         if (typeof facetFilter !== "undefined") {
            const customers = {};
            const customerList = [];
            const statuses = {};
            const statusList = [];
            for (let i = 0, s = data.length; i < s; i++) {
               const entry = data[i];
               if (typeof customers[entry.customerAddressId] === "undefined") {
                  customers[entry.customerAddressId] = true;
                  customerList.push({
                     text: entry.customerName,
                     key: entry.customerAddressId
                  });
                  
               }
               if (typeof statuses[entry.status] === "undefined") {
                  statuses[entry.status] = true,
                  statusList.push({
                     text: entry.status,
                     key: entry.status
                  });
               }
            }
            const facetModel = facetFilter.getModel();
            facetModel.setProperty("/0/values", customerList);
            facetModel.setProperty("/1/values", statusList);
         }
      }
   });
   
   return listExampleController;
});
