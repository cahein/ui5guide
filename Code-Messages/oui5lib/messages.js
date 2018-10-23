(function (logger, util) {
   /** @namespace oui5lib.messages */
   const messages = oui5lib.namespace("messages");

   /**
    * Show notification message briefly without blocking the application.
    * @memberof oui5lib.messages
    * @function showNotification
    * @param {string} msg The message text.
    */
   function showMessageToast(msg, duration) {
      if (typeof duration !== "number") {
         duration = 3000;
      }
      sap.m.MessageToast.show(msg, { duration: duration });
   }
   messages.showNotification = showMessageToast;

   /**
    * Show error message.
    * @memberof oui5lib.messages
    * @function showErrorMessage
    * @param {string} msg The error message.
    * @param {function} handleClose Function to handle the closed event.
    */
   function showErrorMessageBox(msg, handleClose) {
      if (typeof handleClose !== "function") {
         handleClose = handleMessageBoxClosed;
      }
      const title = oui5lib.util.getI18nText("messagebox.error.title");

      jQuery.sap.require("sap.m.MessageBox");
      sap.m.MessageBox.error(msg, {
         title: title,
         onClose: handleClose
      });
   }
   messages.showErrorMessage = showErrorMessageBox;

   /**
    * Default function to handle the onClose event of the sap.m.MessageBox.
    * @memberof oui5lib.messages
    * @inner 
    * @param {string} sResult
    */
   function handleMessageBoxClosed(sResult) {
      oui5lib.logger.info("ErrorMessage closed: " + sResult);
   }
   
   /**
    * Opens a MessageBox to require the user to confirm unsaved changes.
    * @memberof oui5lib.ui
    * @param {function} handleClose The function to call upon user action.
    */
   function confirmUnsavedChanges(handleClose) {
      if (typeof handleClose !== "function") {
         throw TypeError("need a function to handle the onClose event");
      }
      jQuery.sap.require("sap.m.MessageBox");
      sap.m.MessageBox.confirm(oui5lib.util.getI18nText("unsavedChanges.text"), {
         initialFocus: "CANCEL",
         onClose: handleClose
      });
   }
   messages.confirmUnsavedChanges = confirmUnsavedChanges;

   /**
    * Opens a MessageBox to require the user to confirm deleting an entity.
    * @memberof oui5lib.ui
    * @param {string} msg The message to show.
    * @param {function} handleClose  The function to call upon user action.
    */
   function confirmDelete(msg, handleClose) {
      if (typeof handleClose !== "function") {
         throw TypeError("need a function to handle the onClose event");
      }
      jQuery.sap.require("sap.m.MessageBox");
      sap.m.MessageBox.show(msg, {
         icon: "WARNING",
         title: oui5lib.util.getI18nText("confirmDelete.title"),
         actions: [ "DELETE", "CANCEL" ],
         initialFocus: "CANCEL",
         onClose: handleClose
      });
   }
   messages.confirmDelete = confirmDelete;
}(oui5lib.logger, oui5lib.util));
