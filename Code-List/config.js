if (typeof oum === "undefined") {
   var oum = {};
}
oum.config = {
   availableLanguages: [ "en", "de" ],
   defaultLanguage: "en",
   currentLanguage: "en",
   logLevel: "DEBUG",
   entryPoints: [
       {
           "title" : "{i18n>tiles.tableExample.title}",
           "info" : "{i18n>tiles.tableExample.info}",
           "tooltip" : "{i18n>tableExample.tooltip}",
           "icon" : "sap-icon://example",
           "routeName" : "tableExample"
       },
       {
           "title" : "{i18n>tiles.listExample.title}",
           "info" : "{i18n>tiles.listExample.info}",
           "tooltip" : "{i18n>listExample.tooltip}",
           "icon" : "sap-icon://example",
           "routeName" : "listExample"
       },
       {
           "title" : "{i18n>tiles.help.title}",
           "info" : "{i18n>tiles.help.info}",
           "tooltip" : "{i18n>help.tooltip}",
           "icon" : "sap-icon://sys-help",
           "routeName" : "help"
       }
   ]
};
oum.namespace = function(string) {
    var object = this;
    var levels = string.split(".");
    for (var i = 0, l = levels.length; i < l; i++) {
        if (typeof object[levels[i]] === "undefined") {
            object[levels[i]] = {};
        }
        object = object[levels[i]];
    }
    return object;
};
