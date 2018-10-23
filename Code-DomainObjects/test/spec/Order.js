describe("Order entity object", function() {
   beforeAll(function() {
      oum.do.products.resetData();
      oum.do.addresses.resetData();
   });
   beforeEach(function() {
      oum.do.orders.addData(
         JSON.parse(JSON.stringify(oum.fixture.ordersData)), true);
   });

   describe("Instantiation", function() {
      it ("should get a new Order", function() {
         const order = new oum.do.Order();
         expect(order instanceof oum.do.Order).toBe(true);
         expect(order.getProperty("id")).toEqual("-1");
         expect(order.isNew()).toBe(true);
      });
      
      it ("should get an existing Order already loaded", function() {
         const order = new oum.do.Order(2);
         expect(order instanceof oum.do.Order).toBe(true);
         expect(order.getProperty("id")).toEqual(2);
         expect(order.isNew()).toBe(false);
      });
   });
   describe("Accessing and modifying properties", function() {
      it ("should get the Order id as property", function() {
         const order = new oum.do.Order(1);
         expect(order.getProperty("id")).toEqual(1);
      });

      it ("should get the Order id directly", function() {
         const order = new oum.do.Order(2);
         expect(order.id).toEqual(2);
      });
   
      it ("should allow modification of Order data", function() {
         const order = new oum.do.Order(2);
         expect(order.getProperty("status")).toEqual("processing");
         expect(order.wasModified()).toEqual(false);
         order.setProperty("status", "shipped");
         expect(order.getProperty("status")).toEqual("shipped");
         expect(order.wasModified()).toEqual(true);
      });
   });
   
   it ("should call the Loader to request an Order not in the collection", function() {
      spyOn(oum.do.Loader, "loadOrder");
      
      expect(oum.do.orders.isItemLoaded(8)).toBe(false);
      const order = new oum.do.Order(8);
      expect(oum.do.Loader.loadOrder).toHaveBeenCalledWith(8);
   });



   
   it ("should have functions to get the billing and shipping addresses", function() {
      const order = new oum.do.Order();
      expect(typeof order.getBillingAddress).toEqual("function"); 
      expect(typeof order.getShippingAddress).toEqual("function"); 
   });

   it ("should get referenced address entity objects", function() {
      oum.do.addresses.addData(oum.fixture.addressesData, true);

      const order = new oum.do.Order(2);
      const billingAddress = order.getBillingAddress();
      expect(billingAddress instanceof oum.do.Address).toBe(true);
      expect(billingAddress.getProperty("id")).toEqual(2);

      const shippingAddress = order.getShippingAddress();
      expect(shippingAddress instanceof oum.do.Address).toBe(true);
      expect(shippingAddress.getProperty("id")).toEqual(3);
   });


   
   it ("should process and return the enriched order lines", function() {
      oum.do.products.addData(oum.fixture.productsData, true);

      const order = new oum.do.Order(1);
      const orderLines = order.getOrderLines();

      expect(orderLines.length).toEqual(2);
      orderLines.forEach(function(orderLine) {
         expect(typeof orderLine.productName).toBe("string");
         expect(typeof orderLine.lineTotal).toBe("string");
      });
      expect(orderLines[0].quantity).toEqual(2);
      expect(orderLines[0].unitPrice).toEqual("4.80");
      expect(orderLines[0].lineTotal).toEqual("9.60");
      
      expect(orderLines[1].quantity).toEqual(1);
      expect(orderLines[1].unitPrice).toEqual("19.90");
      expect(orderLines[1].lineTotal).toEqual("19.90");
   });

   it ("should change the order line quantity and update related totals", function() {
      const order = new oum.do.Order(1);
      const orderLine = order.getOrderLine("0394718747");

      expect(orderLine.quantity).toEqual(2);
      expect(orderLine.lineTotal).toEqual("9.60");
      expect(order.getProperty("total")).toEqual("29.50");

      const success = order.changeOrderItemQuantity("0394718747", "1");
      expect(success).toBe(true);

      expect(orderLine.quantity).toEqual(1);
      expect(orderLine.lineTotal).toEqual("4.80");
      expect(order.getProperty("total")).toEqual("24.70");
   });

   it ("should remove an order line and recalulate the order total", function() {
      const order = new oum.do.Order(1);
      const orderLines = order.getOrderLines();

      expect(orderLines.length).toEqual(2);
      expect(order.getProperty("total")).toEqual("29.50");

      const removedItem = order.removeOrderLine("0394718747");
      expect(typeof removedItem === "object").toBe(true);

      expect(orderLines.length).toEqual(1);
      expect(order.getProperty("total")).toEqual("19.90");
   });
   
   it ("should not add another order line for a product already ordered", function() {
      const order = new oum.do.Order(1);
      const orderLines = order.getOrderLines();

      order.addOrderLine("0394718747", 3);
      
      expect(orderLines.length).toEqual(2);
      expect(order.getProperty("total")).toEqual("29.50");

   });
   it ("should add an order line and recalulate the order total", function() {
      const order = new oum.do.Order(1);
      const orderLines = order.getOrderLines();

      order.addOrderLine("0521560241", 1);
      
      expect(orderLines.length).toEqual(3);
      expect(order.getProperty("total")).toEqual("134.50");
   });
});
