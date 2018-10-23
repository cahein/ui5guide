describe("Loading data into Domain Collection Objects", function() {
   const Loader = oum.do.Loader;
   
   beforeEach(function() {
      oum.do.orders.resetData();
      oum.do.products.resetData();
      oum.do.addresses.resetData();
   });
   it ("should load orders into the orders collection object", function() {
      Loader.queryOrders({ "startDate": oum.fixture.startDate });

      const data = oum.do.orders.getData();
      expect(data instanceof Array).toBe(true);
      expect(data.length).toEqual(2);
   });
   it ("should load an order into the orders collection object", function() {
      Loader.loadOrder(oum.fixture.orderId);

      const data = oum.do.orders.getData();
      expect(data instanceof Array).toBe(true);
      expect(data.length).toEqual(1);
   });
});
