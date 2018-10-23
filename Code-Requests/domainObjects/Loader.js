/** @namespace oum.do.Loader */
(function() {
   function loadOrder(orderId) {
      oui5lib.request.sendMappingRequest(
         "order", "getOrder",
         { "id": orderId },
         handleSuccessfulResponse
      );
   }

   function queryOrders(query) {
      oui5lib.request.sendMappingRequest(
         "order", "getOrders",
         query,
         handleSuccessfulResponse
      );
   }
   
   function handleSuccessfulResponse(responseObject, requestInfo) {
      const entity = requestInfo.entity;
      if (responseObject.result) {
         const data = responseObject.value;
      } else {
         oui5lib.logger.error("No data returned:" + entity);
      }
   }
   
   const loader = oum.namespace("do.Loader");
   loader.queryOrders = queryOrders;
   loader.loadOrder = loadOrder;

   // add for testing only
   loader.handleSuccessfulResponse = handleSuccessfulResponse;
}());
