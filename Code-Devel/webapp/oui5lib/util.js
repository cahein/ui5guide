(function () {
   const util = oui5lib.namespace("util");

   function getComponentRouter() {
      const component = oui5lib.configuration.getComponent();
      return component.getRouter();
   }
   
   util.getRouter = getComponentRouter;
}());
