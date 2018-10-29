(function() {
   const ui = oum.namespace("lib.ui");

   function handleMessage(messagesContainer) {
      if (typeof messagesContainer.removeAllItems === "function" &&
          typeof messagesContainer.addItem === "function") { 
         messagesContainer.removeAllItems();

         if (typeof oum.message !== "undefined") {
            messagesContainer.addItem(
               new sap.m.MessageStrip({
                  text: oum.message.text,
                  type: oum.message.type,
                  showIcon: true
               })
            );
         }
      }
      delete oum.message;
   }
   ui.handleMessage = handleMessage;
   
   function setBusy(isBusy, delay) {
      if (typeof delay !== "number") {
         delay = 100;
      }
      const component = oui5lib.configuration.getComponent();
      const rootControl = component.getRootControl();
      if (isBusy) {
         rootControl.setBusyIndicatorDelay(delay).setBusy(true);
      } else {
         rootControl.setBusy(false);
      }
   }
   ui.setBusy = setBusy;
}());
