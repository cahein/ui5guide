sap.ui.jsfragment("oum.fragment.HelpButton", {
   createContent: function () {
      const btn = new sap.m.Button({
         icon : "sap-icon://sys-help",
         tooltip : "{i18n>button.help.tooltip}",
         press: function() {
            const component = sap.ui.getCore().getComponent("oumComponent");
            const router = component.getRouter();
            router.vNavTo("help");
         }
      });
      return btn;
   }
});
