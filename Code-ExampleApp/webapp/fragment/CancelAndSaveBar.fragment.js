sap.ui.jsfragment ("oum.fragment.CancelAndSaveBar", { 
   createContent: function (oController) {
      const btnSave =  new sap.m.Button({
         icon: "sap-icon://save",
         tooltip: "{i18n>button.save.tooltip}",
         press: function() {
            oController.saveRecord();
         }
      });
      const btnCancel =  new sap.m.Button({
         icon: "sap-icon://sys-cancel",
         tooltip: "{i18n>button.cancel.tooltip}",
         press: function() {
            oController.cancel();
         }
      });
      const bar = new sap.m.Bar({
         contentLeft: [],
         contentRight: [ btnSave, btnCancel ]
      });
      return bar;
   }
});
