sap.ui.define([
   "oum/controller/OrderBaseController",
   "oum/do/orders",
   "oum/do/Order",
   "oum/do/addresses",
   "oum/do/Address",
   "oum/do/countries",
   "oum/lib/ui"
], function(oController, orders, Order, addresses, Address, countries, ui) {
   "use strict";

   const orderAddressController = oController.extend("oum.controller.orderAddress", {
      onInit: function() {
         const eventBus = sap.ui.getCore().getEventBus();
         eventBus.subscribe("loading", "ready", this._handleLoaded, this);

         this.getRouter().getRoute("orderAddress")
            .attachPatternMatched(this._onRouteMatched, this);
      },


      _onRouteMatched: function(oEvent) {
         this.debug("orderAddress page");

         const messagesContainer = this.getView().byId("messagesContainer");
         ui.handleMessage(messagesContainer);
         
         const args = oEvent.getParameter("arguments");
         const orderId = args.id;
         const type = args.type;
         this.info("edit order address: " + orderId + ":" + type);

         this.orderId = orderId;
         this.addressType = type;

         if (orderId == "-1") {
            this.setAddressModel();
         } else {
            const order = new Order(orderId);
            if (!order.isLoading()) {
               this.setAddressModel();
            }
         }
         this.setHeaderTitle(type);
      },
      setHeaderTitle: function(addressType) {
         const pageTitle = this.getView().byId("pageTitle");
         pageTitle.setText(oui5lib.util.getI18nText("address." +  addressType));
      },
      

      _handleLoaded: function(channel, eventId, eventData) {
         if (typeof eventData === "object") {
            if (eventData.entity === "order" &&
                eventData.id == this.orderId) {
               this.setAddressModel();
            }
         } else {
            if (eventData === "countries") {
               this.setCountriesModel();
            }
         }
      },
      setCountriesModel: function() {
         const countrySelect = this.getView().byId("address_countryCode");
         countrySelect.setModel(countries.getModel(), "countries");
      },


      setAddressModel: function() {
         this.prepareEditedOrder(this.orderId);
         const order = this.getEditedOrder();
         if (!(order instanceof oum.do.Order)) {
            throw new TypeError("Need an oum.do.Order to edit");
         }
         
         let address = null;
         switch(this.addressType) {
         case "billing":
            address = order.getBillingAddress();
            break;
         case "shipping":
            address = order.getShippingAddress();
            break;
         }
         if (address === null) {
            this.debug("new Address");
            address = new Address();
         }
         
         const form = this.getView().byId("addressForm");
         form.setModel(address.getModel(), "address");
      },


      getAddressDialog: function() {
         if (typeof this.addressDialog === "undefined") {
            const selectAddressDialog =
                  sap.ui.xmlfragment("oum.fragment.SelectAddressDialog", this);
            this.getView().addDependent(selectAddressDialog);
            
            selectAddressDialog.setModel(new sap.ui.model.json.JSONModel());
            this.addressDialog = selectAddressDialog;
         }
         return this.addressDialog;
      },
      openAddressDialog: function() {
         const addressDialog = this.getAddressDialog();
         addressDialog.bindProperty("title", "i18n>address.find");
         addressDialog.detachLiveChange(this.filterAddresses, this);

         const model = addressDialog.getModel();
         model.setData([]);
         addressDialog.open();
      },
      queryAddresses: function(oEvent) {
         const source = oEvent.getSource();
         let matchType = "Contains";
         if (source instanceof sap.m.SelectDialog) {
            this.getAddressDialog().setBusy(true);
         } else {
            matchType = "EQ";
         }
         const queryString = oEvent.getParameter("value");

         oui5lib.request.sendMappingRequest(
            "address", "queryAddresses",
            {
               query: queryString,
               matchType: matchType
            },
            this.handleQueriedAddresses.bind(this)
         );
      },
      handleQueriedAddresses: function(responseObject, requestProps) {
         const addressDialog = this.getAddressDialog();
         if (responseObject.result) {
            const listBinding = addressDialog.getBindingContext();
            listBinding.filter([]);

            const addressData = responseObject.value;
            const model = addressDialog.getModel();
            model.setData(addressData);

            if (addressDialog.getBusy()) {
               addressDialog.setBusy(false);
               addressDialog.setNoDataText(
                  oui5lib.util.getI18nText(
                     "list.noMatchingData",
                     [ requestProps.entity, requestProps.requestParameters.query ]
                  )
               );

            } else if (addressData instanceof Array && addressData.length > 0) {
               addressDialog.bindProperty("title", "i18n>addresses.found");
               addressDialog.attachLiveChange(this.filterAddresses, this);
               addressDialog.open();
            }
         } else {
            addressDialog.destroy();
            oui5lib.messages.showErrorMessage(
               oui5lib.util.getI18nText("query.result.error", [ requestProps.entity ])
            );
         }
      },
      filterAddresses: function(oEvent) {
         const query = oEvent.getParameter("value");
         const listBinding = oEvent.getParameter("itemsBinding");
         const nameFilters = [
            new sap.ui.model.Filter("firstname", "Contains", query),
            new sap.ui.model.Filter("lastname", "Contains", query)
         ];
         listBinding.filter([
            new sap.ui.model.Filter({
               filters: nameFilters, and: false
            })
         ]);
      },
      handleAddressSelected: function(oEvent) {
         const selectedItem = oEvent.getParameter("selectedItem");
         const bindingContext = selectedItem.getBindingContext();
         const model = bindingContext.getModel();
         const addressData = model.getProperty(bindingContext.getPath());
         addresses.addData(addressData);
         
         const address = new Address(addressData.id);
         this.info("address selected: " + this.addressType + ":" + address.id);

         const order = this.getEditedOrder();
         order.setProperty(this.addressType + "AddressId", address.id);
         order.setProperty(this.addressType + "Name", address.getName());

         this.setOrderNotSaved(true);
         this.setAddressModel();
      }
   });
   return orderAddressController;
});
