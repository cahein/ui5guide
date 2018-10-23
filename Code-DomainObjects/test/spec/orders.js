describe("Orders collection object", function() {
   const orders = oum.do.orders;
   
   beforeAll(function() {
      oum.do.addresses.resetData();
      oum.do.products.resetData();
   });
   beforeEach(function() {
      orders.addData(JSON.parse(JSON.stringify(oum.fixture.ordersData)), true);
   });

   it ("should return the orders collection", function() {
      const data = orders.getData(); 
      expect(data instanceof Array).toBe(true);
      expect(data.length).toBe(2);
   });
   
   it ("should return the item count", function() {
      expect(orders.getItemCount()).toBe(2);
   });

   it ("should allow us to check if an order is loaded", function() {
      expect(orders.isItemLoaded(1) instanceof Date).toBe(true);
      expect(orders.isItemLoaded(2) instanceof Date).toBe(true);
      expect(orders.isItemLoaded(3)).toBe(false);
   });

   it ("should return order data by id", function() {
      const data = orders.getItem(1); 
      expect(data.id).toBe(1);
   });


   
   it ("should add address names to the order data", function() {
      oum.do.addresses.addData(oum.fixture.addressesData);
      const orderData = oum.fixture.ordersData[0];
      
      orders.procAddresses(orderData);
      expect(typeof orderData.billingName === "string").toBe(true);
      expect(typeof orderData.shippingName === "string").toBe(true);
   });


   
   it ("should call function to handle referenced addresses and products", function() {
      spyOn(oum.do.RefsHandler, "processOrderReferences");
      orders.addData(oum.fixture.ordersData, true);
      expect(oum.do.RefsHandler.processOrderReferences
             .calls.count()).toEqual(1);
   });


   
   it ("should convert date string to Date object", function() {
      const order = orders.getItem(1);
      expect(order.orderDate instanceof Date).toBe(true);
   });

   it ("should calculate and add the order total ", function() {
      const order = orders.getItem(1);
      expect(typeof order.total).toEqual("string");
      expect(order.total).toEqual("29.50");
   });
});
