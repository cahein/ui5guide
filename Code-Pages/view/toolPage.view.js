sap.ui.jsview("oum.view.toolPage", {
   getControllerName : function() {
      return "oum.controller.pageExamples";
   },
   
   createContent : function(oController) {
      const toolHeader = new sap.tnt.ToolHeader({
         sideExpanded: true,
         content: [
            new sap.m.Button({
               icon: "sap-icon://menu2",
               type: "Transparent",
               tooltip: "Collapse Side Navigation",
               layoutData: new sap.m.OverflowToolbarLayoutData({
                  minWidth: "20px",
                  priority: "NeverOverflow"
               }),
               press: function(oEvent) {
                  oController.toggleSideNavigation(oEvent);
               }
            }),
            new sap.m.Title({
               text: "header content Title",
               level: "H1",
               titleStyle: "H4"
            }),
            new sap.m.ToolbarSpacer({
               width: "20px"
            }),
            new sap.m.Button({
               text: "Edit",
               tooltip: "Describe edit",
               type: "Transparent"
            }),
            new sap.m.ToolbarSeparator(),
            new sap.m.Button({
               text: "Tools",
               type: "Transparent",
               tooltip: "Describe tools",
               layoutData: new sap.m.OverflowToolbarLayoutData({
                  group: 1,
                  priority: "Low"
               })
            }),
            new sap.m.Button({
               text: "Options",
               tooltip: "Describe options",
               type: "Transparent",
               layoutData: new sap.m.OverflowToolbarLayoutData({
                  group: 1,
                  priority: "Low"
               })
            }),
            new sap.m.OverflowToolbarButton({
               text: "Help",
               type: "Transparent",
               icon: "sap-icon://sys-help"
            }),
            new sap.m.ToolbarSpacer(),
            sap.ui.jsfragment("oum.fragment.LanguageSwitcher"),
            sap.ui.jsfragment("oum.fragment.HomeButton"),
         ]
      });
      
      const sideNavigation = new sap.tnt.SideNavigation({
         expanded: true,
         itemSelect: function(oEvent) {
            oController.navigationItemSelect(oEvent);
         },
         item: new sap.tnt.NavigationList({
            items: [
               new sap.tnt.NavigationListItem({
                  key: "item1",
                  text: "Item 1",
                  icon: "sap-icon://cargo-train",
                  tooltip: "Some description of Item 1",
                  expanded: false,
                  items: [
                     new sap.tnt.NavigationListItem({
                        key: "item11",
                        text: "Item 1.1",
                        tooltip: "Some description of Item 1.1"
                     }),
                     new sap.tnt.NavigationListItem({
                        key: "item12",
                        text: "Item 1.2",
                        tooltip: "Some description of Item 1.2"
                     })
                  ]
               }),
               new sap.tnt.NavigationListItem({
                  key: "item2",
                  text: "Item 2",
                  icon: "sap-icon://bus-public-transport",
                  tooltip: "Some description of Item 2"
               })
            ]
         }),
         fixedItem: new sap.tnt.NavigationList({
            items: [
               new sap.tnt.NavigationListItem({
                  key: "fixed1",
                  text: "Fixed Item",
                  icon: "sap-icon://collision",
                  tooltip: "Some description of fixed item"
               })
            ]
         }),
         footer: new sap.tnt.NavigationList({
            items: [
               new sap.tnt.NavigationListItem({
                  key: "footer1",
                  text: "Footer Item",
                  icon: "sap-icon://incident",
                  tooltip: "Some description of footer item"
               })
            ]
         })
      });
      
      const toolPage = new sap.tnt.ToolPage({
         header: toolHeader,
         sideContent: sideNavigation,
         mainContents: [
            new sap.m.Title({
               text: "Main contents area",
               level: "H3",
               titleStyle: "H3"
            })
         ]
      });
      return toolPage;
   }
});
