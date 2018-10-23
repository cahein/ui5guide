(function () {
   function Order(id, isClone) {
      if (!(this instanceof oum.do.Order)) {
         return new oum.do.Order(id, isClone);
      }
      if (typeof isClone !== "boolean") {
         isClone = false;
      }
      this.setIsClone(isClone);

      if (id === undefined || id === null) {
         this.setData(getNewOrder());
         this.setNew(true);
      } else {
         this.id = id;
         if (oum.do.orders.isItemLoaded(id)) {
            let orderEntry = oum.do.orders.getItem(id);
            if (isClone) {
               orderEntry = oui5lib.util.cloneData(orderEntry);
            }
            this.setData(orderEntry);
         } else {
            this.setLoading(true);
            oum.do.orders.addItemDataChangedListener(dataAvailable, this);
            oum.do.Loader.loadOrder(id);
         }
      }
   }
   
   function dataAvailable(orderId) {
      if (this.id === orderId) {
         oum.do.orders.removeItemDataChangedListener(dataAvailable, this);
         let orderEntry = oum.do.orders.getItem(orderId);
         if (this.isClone()) {
            orderEntry = oui5lib.util.cloneData(orderEntry);
         }
         this.setData(orderEntry);
         this.setLoading(false);
      }
   }

   function getNewOrder() {
      const newOrder = {
         "id": "-1",
         "status": "new",
         "billingAddressId": null,
         "shippingAddressId": null,
         "items": []
      };
      if (oui5lib.util.isUI5Env()) {
         newOrder.statusText = oui5lib.util.getI18nText("orderStatus.new");
      }
      return newOrder;
   }

   function getBillingAddress() {
      const id = this.getProperty("billingAddressId");
      return getAddress.call(this, id);
   }

   function getShippingAddress() {
      const id = this.getProperty("shippingAddressId");
      return getAddress.call(this, id);
   }

   function getAddress(id) {
      if (oum.do.addresses.isItemLoaded(id)) {
         return new oum.do.Address(id, this.isClone());
      }
      return null;
   }
   function shiptoBillingAddress() {
      return this.getProperty("billingAddressId") ===
         this.getProperty("shippingAddressId");
   }



   
   function getOrderLines() {
      const orderLines = this.getProperty("items");
      orderLines.forEach(function(orderLine) {
         if (oum.do.products.isItemLoaded(orderLine.productId)) {
            const product = new oum.do.Product(orderLine.productId);
            orderLine.productName = product.getName();
         }
         const unitPrice = orderLine.unitPrice;
         if (typeof unitPrice === "number") {
            const total = unitPrice * orderLine.quantity;

            orderLine.unitPrice = unitPrice.toFixed(2);
            orderLine.lineTotal = total.toFixed(2);
         }
      });
      return orderLines;
   }

   const listHelper = oui5lib.lib.listHelper;

   function getOrderLine(productId) {
      const orderLines = this.getOrderLines();
      return listHelper.getItemByKey(orderLines, "productId", productId);
   }

   function updateOrderLineQuantity(productId, quantity) {
      const orderLine = this.getOrderLine(productId);
      if (orderLine === null || isNaN(parseInt(quantity))) {
         return false;
      }
      
      orderLine.quantity = parseInt(quantity);
      const unitPrice = parseFloat(orderLine.unitPrice);
      if (typeof unitPrice === "number") {
         let total = unitPrice * orderLine.quantity;
         orderLine.lineTotal = total.toFixed(2);
      }
      this.setOrderTotal();
      return true;
   }

   function removeOrderLine(productId) {
      let removedLine;
      if (this.getOrderLine(productId) !== null) {
         const orderLines = this.getOrderLines();
         removedLine = listHelper.removeByKey(orderLines, "productId", productId);
         if (removedLine !== null) {
            this.setOrderTotal();
         }
      }
      return removedLine;
   }

   function addOrderLine(productId, quantity) {
      if (!oum.do.products.isItemLoaded(productId) || isNaN(quantity)) {
         return;
      }

      if (this.getOrderLine(productId) === null) {
         const product = new oum.do.Product(productId);
         const newOrderLine = {
            "productId": productId,
            "quantity": quantity,
            "unitPrice": product.getProperty("salesPrice")
         };
         const orderLines = this.getOrderLines();
         orderLines.push(newOrderLine);

         this.setOrderTotal();
      }
   }

   function setOrderTotal() {
      const orderLines = this.getOrderLines();
      const total = oum.do.orders.calculateOrderTotal(orderLines);
      this.setProperty("total", total);
      return total;
   }
   
   Order.prototype = Object.create(oui5lib.itemBase);
   Order.prototype.getBillingAddress = getBillingAddress;
   Order.prototype.getShippingAddress = getShippingAddress;
   Order.prototype.shiptoBillingAddress = shiptoBillingAddress;

   Order.prototype.getOrderLines = getOrderLines;
   Order.prototype.addOrderLine = addOrderLine;
   Order.prototype.removeOrderLine = removeOrderLine;
   Order.prototype.changeOrderItemQuantity = updateOrderLineQuantity;
   
   Order.prototype.getOrderLine = getOrderLine;
   Order.prototype.setOrderTotal = setOrderTotal;
   oum.do.Order = Order;
}());
