sap.ui.jsfragment("oum.fragment.HomeButton", {
   createContent: function () {
      const btn =  new sap.m.Button({
         icon: "sap-icon://home",
         tooltip: "{i18n>button.home.tooltip}",
         press: function () {
            const router = oui5lib.util.getRouter();
            router.vNavTo("home");
         }
      });
      return btn;
   }
});
