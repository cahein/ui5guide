describe("Namespace oum.do.Loader", function() {
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
   
   it ("should call function to request orders by startDate and status", function() {
      loader.queryOrders({ "startDate": oum.fixture.startDate,
                          "statuses": oum.fixture.statuses });

      expect(oui5lib.request.sendMappingRequest.calls.count()).toEqual(1);
      expect(oui5lib.request.sendMappingRequest)
         .toHaveBeenCalledWith("order", "getOrders",
                               { "startDate": oum.fixture.startDate,
                                 "statuses": oum.fixture.statuses },
                               loader.handleSuccessfulResponse);
   });
   
   it ("should call function to request orders although" +
       " a required parameter is omitted", function() {
      loader.queryOrders({"statuses": oum.fixture.statuses });
       
      expect(oui5lib.request.sendMappingRequest.calls.count()).toEqual(1);
      expect(oui5lib.request.sendMappingRequest)
         .toHaveBeenCalledWith("order", "getOrders",
                               { "statuses": oum.fixture.statuses },
                               loader.handleSuccessfulResponse);
   });

   
   it ("should notify the RefsHandler of incoming data", function() {
      const responseObject = {
         result: true,
         value: oum.fixture.addressesData
      };
      const requestInfo = {
         entity: "address"
      };
      spyOn(oum.do.RefsHandler, "handleDataLoaded");
      loader.handleSuccessfulResponse(responseObject, requestInfo);
      expect(oum.do.RefsHandler.handleDataLoaded.calls.count()).toEqual(1);
      expect(oum.do.RefsHandler.handleDataLoaded)
         .toHaveBeenCalledWith("address", oum.fixture.addressesData);
   });
});
