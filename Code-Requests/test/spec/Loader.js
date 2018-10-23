describe("Loader object", function() {
   const loader = oum.do.Loader;
   beforeAll(function() {
      spyOn(oui5lib.request, "sendMappingRequest");
   });
   afterEach(function() {
      oui5lib.request.sendMappingRequest.calls.reset();
   });
   it ("should call function to request orders data by startDate", function() {
      loader.queryOrders({ "startDate": oum.fixture.startDate });

      expect(oui5lib.request.sendMappingRequest.calls.count()).toEqual(1);
      expect(oui5lib.request.sendMappingRequest)
         .toHaveBeenCalledWith("order", "getOrders",
                               { "startDate": oum.fixture.startDate },
                               loader.handleSuccessfulResponse);
   });

   it ("should call function to request orders by startDate and endDate", function() {
      loader.queryOrders({ "startDate": oum.fixture.startDate,
                          "endDate": oum.fixture.endDate });

      expect(oui5lib.request.sendMappingRequest.calls.count()).toEqual(1);
      expect(oui5lib.request.sendMappingRequest)
         .toHaveBeenCalledWith("order", "getOrders",
                               { "startDate": oum.fixture.startDate,
                                 "endDate": oum.fixture.endDate },
                               loader.handleSuccessfulResponse);
   });
   
   it ("should call function to request orders by startDate and statuses", function() {
      loader.queryOrders({ "startDate": oum.fixture.startDate,
                           "statuses": oum.fixture.statuses });

      expect(oui5lib.request.sendMappingRequest.calls.count()).toEqual(1);
      expect(oui5lib.request.sendMappingRequest)
         .toHaveBeenCalledWith("order", "getOrders",
                               { "startDate": oum.fixture.startDate,
                                 "statuses": oum.fixture.statuses },
                               loader.handleSuccessfulResponse);
   });
   
   it ("should call function to request orders even without a required parameter", function() {
      loader.queryOrders({"statuses": oum.fixture.statuses });
       
      expect(oui5lib.request.sendMappingRequest.calls.count()).toEqual(1);
      expect(oui5lib.request.sendMappingRequest)
         .toHaveBeenCalledWith("order", "getOrders",
                               { "statuses": oum.fixture.statuses },
                               loader.handleSuccessfulResponse);
   });
});
