sap.ui.define([
   "oui5lib/controller/BaseController"
], function(Controller) {
   "use strict";

    const semanticExamplesController = Controller.extend("oum.controller.semanticExamples", {
        onInit: function () {
        },

        titleMainAction: function(oEvent) {
            alert("say hello");
        },
        closeAction: function(oEvent) {
            this.getRouter().vNavTo("home");
        },
        addAction: function(oEvent) {
            alert("Add");
        }
    });
    return semanticExamplesController;
});
