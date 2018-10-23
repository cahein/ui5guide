sap.ui.jsfragment("oum.fragment.BackButton", {
   createContent: function () {
      const btn = new sap.m.Button({
         icon: "sap-icon://nav-back",
         tooltip: "{i18n>button.back.tooltip}",
         press: function () {
            const router = oui5lib.util.getRouter();
            router.navBack();
         }
      });
      return btn;
   }
});
