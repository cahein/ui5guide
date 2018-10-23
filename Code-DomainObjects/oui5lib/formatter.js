(function () {
   /** @namespace oui5lib.formatter */
   const formatter = oui5lib.namespace("formatter");

   function getDateFromString(dateString, dateFormat) {
      return new Date(dateString);
   }
   formatter.getDateFromString = getDateFromString;
}());
