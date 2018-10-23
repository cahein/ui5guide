sap.ui.model.SimpleType.extend("oum.lib.type.Email", {
   formatValue: function(oValue) {
      return oValue;
   },
   parseValue: function(oValue) {
      return oValue;
   },
   validateValue: function(oValue) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!regex.test(oValue)) {
         throw new sap.ui.model.ValidateException(oui5lib.util.getI18nText("invalid.email"));
      }
   }
});
