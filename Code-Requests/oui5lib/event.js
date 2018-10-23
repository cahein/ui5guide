/** @namespace oui5lib.event */
(function () {
    function publishRequestFailureEvent(eventId, xhr, props) {
        if (typeof props === "undefined" || props === null) {
            props = {};
        }
        props.xhrObj = xhr;
        publishEvent("xhr", eventId, props);
    }
    
    function publishReadyEvent(eventData) {
        publishEvent("loading", "ready", eventData);
    }

    function publishEvent(channelId, eventId, eventData) {
        if (typeof sap === "undefined" ||
            typeof sap.ui === "undefined") {
            oui5lib.logger.warn("Couldn't publish event: no UI5 loaded");
            return;
        }
        var eventBus = sap.ui.getCore().getEventBus();
        eventBus.publish(channelId, eventId, eventData);
    }
    
    var event = oui5lib.namespace("event");
    event.publishRequestFailureEvent = publishRequestFailureEvent;
    event.publishReadyEvent = publishReadyEvent;
}());
