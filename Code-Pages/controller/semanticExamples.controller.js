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
        addAction: function(oEvent) {
            alert("Add");
        }
    });
    return semanticExamplesController;
});
