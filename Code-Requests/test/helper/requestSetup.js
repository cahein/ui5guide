oui5lib.request.getTestingUrl = function(pathname) {
    switch(pathname) {
    case "getOrders":
        return "mockdata/orders.json";
    case "getOrder":
        return "mockdata/order.json";
    default:
        return null;
    }
};
