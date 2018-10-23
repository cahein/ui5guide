/**
 * Use this fragment to get a Select control to change the language.
 * @module oum.fragment.LanguageSwitcher
 */
sap.ui.jsfragment("oum.fragment.LanguageSwitcher", {
    /**
     * Creates the control.
     * @returns {sap.m.Select} The Select control.
     */
    createContent: function () {
        const languageSelect = new sap.m.Select({
            tooltip: "{i18n>language.select.tooltip}",
            selectedKey: oui5lib.configuration.getCurrentLanguage(),
            change: function (oEvent) {
                var selectedLanguage = oEvent.getParameter("selectedItem").getKey();
                oui5lib.logger.debug("selected language: " + selectedLanguage);
                if (oui5lib.configuration.getCurrentLanguage() !== selectedLanguage) {
                    oui5lib.configuration.setCurrentLanguage(selectedLanguage);
                    
                }
            }
        });

        const availableLanguages = oui5lib.configuration.getAvailableLanguages();
        if (availableLanguages !== undefined) {
            let item;
            availableLanguages.forEach(function(languageKey) {
                var item = new sap.ui.core.Item({
                    text: "{i18n>language." + languageKey + "}",
                    key: languageKey
                });
                languageSelect.addItem(item);
            });
        }
        return languageSelect;
    }
});
