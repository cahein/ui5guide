(function(configuration) {
   "use strict";
   
   const util = oui5lib.namespace("util");

   function getComponentRouter() {
      const component = configuration.getComponent();
      if (component !== null) {
         return component.getRouter();
      }
      return null;
   }
   
   function getComponentEventBus() {
      const component = configuration.getComponent();
      if (component !== null) {
         return component.getEventBus();
      }
      return null;
   }
   
   function deepFreeze(o) {
      var prop, propKey;
      Object.freeze(o);
      for (propKey in o) {
         prop = o[propKey];
         if (!(o.hasOwnProperty(propKey) && (typeof prop === "object")) ||
             Object.isFrozen(prop)) {
            continue;
         }
         this.deepFreeze(prop);
      }
   }
   util.getRouter = getComponentRouter;
   util.getComponentEventBus = getComponentEventBus;
   util.deepFreeze = deepFreeze;
}(oui5lib.configuration));
