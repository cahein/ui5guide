sap.ui.jsview("oum.view.objectPage", {
   getControllerName : function() {
      return "oum.controller.pageExamples";
   },
   createContent : function(oController) {
      const dynamicHeaderTitle = new sap.uxap.ObjectPageDynamicHeaderTitle({
         heading: new sap.m.Title({
            text: "ObjectPageDynamicHeaderTitle 'heading'",
            level: "H2",
            titleStyle: "H2"
         }),
         breadcrumbs: new sap.m.Breadcrumbs({
            currentLocationText: "Example ObjectPageLayout",
            links: [
               new sap.m.Link({
	          text: "Home",
                  href: "index.html",
                  press: function(oEvent) {
                     oController.handleBreadCrumb(oEvent);
                  }
               })
            ]
         })
      });

      const pageHeader = new sap.uxap.ObjectPageHeader({
         objectTitle: "The object title",
         objectSubtitle: "Have something more to say about the object",
         isObjectIconAlwaysVisible: true,
         objectImageURI: "image/objectImage.png",
         objectImageAlt: "A bee collecting pollen",
         objectImageShape: "Circle",
         actions: [
            new sap.uxap.ObjectPageHeaderActionButton({
               icon: "sap-icon://hide",
               text: "Show Footer",
               tooltip: "Show Footer",
               hideIcon: false,
               hideText: true,
               importance: "Low",
               press: function(oEvent) {
                  oController.toggleFooter(oEvent);
               }
            }),
            sap.ui.jsfragment("oum.fragment.HomeButton")
         ],
         showTitleSelector: true,
         titleSelectorPress: function() {
            oController.handleTitleSelectorPress();
         }
	 // showMarkers: true,
	 // markLocked: true,
         // markLockedPress: function() {
         //    oController.handleMarkLockedPress();
         // },
	 // markFavorite: true,
         // markFlagged: true,
         // breadCrumbsLinks: [
  	 //    new sap.m.Link({
	 //       text: "Home",
         //       press: function(oEvent) {
         //          oController.handleBreadCrumb(oEvent);
         //       }
         //    })
         // ],
         // navigationBar: new sap.m.Bar({
         //    contentLeft: [
         //       new sap.m.Text({
         //          text: "navigationBar contentLeft"
         //       })
         //    ],
         //    contentMiddle: [
         //       new sap.m.Text({
         //          text: "navigationBar contentMiddle"
         //       })
         //    ],
         //    contentRight: [
         //       new sap.m.Text({
         //          text: "navigationBar contentRight"
         //       })
         //    ]
         // })
      });
      const headerContent =  [
         new sap.ui.layout.VerticalLayout({
            content: [
               new sap.m.Text({
                  text: "'headerContent' is an array of Control objects"
               })
            ]
         })
      ];
      
      const firstPageSection = new sap.uxap.ObjectPageSection({
         title: "ObjectPageSection 1 title",
         content: [
            new sap.m.Text({
               text: "section 1 content"
            })
         ],
         subSections: [
            new sap.uxap.ObjectPageSubSection({
               title: "ObjectPageSubSection 1.1",
               blocks: [
                  new sap.m.Text({
                     text: "section 1 subsection 1 block 1"
                  })
               ],
               moreBlocks: [
                  new sap.m.Text({
                     text: "section 1 subsection 1 more 1"
                  }),
                  new sap.m.Text({
                     text: "section 1 subsection 1 more 2"
                  })
               ],
               actions: [
                  new sap.m.Button({
                     text: "Edit",
                     tooltip: "Describe edit"
                  }),
                  new sap.m.Button({
                     text: "Update",
                     tooltip: "Describe update"
                  })
               ]
            }),
            new sap.uxap.ObjectPageSubSection({
               title: "ObjectPageSubSection 1.2",
               blocks: [
                  new sap.m.Text({
                     text: "section 1 subsection 2 block 1"
                  })
               ]
            })
         ]
      });
      const secondPageSection = new sap.uxap.ObjectPageSection({
         title: "ObjectPageSection 2 title",
         content: [
            new sap.m.Text({
               text: "section 2 content"
            })
         ],
         subSections: [
            new sap.uxap.ObjectPageSubSection({
               title: "ObjectPageSubSection 2.1",
               blocks: [
                  new sap.m.Text({
                     text: "section 2 subsection 1 block 1"
                  }),
               ]
            })
         ]
      });
      
      const pageLayout = new sap.uxap.ObjectPageLayout({
         showTitleInHeaderContent: false,
         headerTitle: pageHeader,
         headerContent: headerContent,
         sections: [
            firstPageSection,
            secondPageSection
         ],
         showFooter: false,
         footer: sap.ui.xmlfragment("oum.fragment.AppInfoToolbar")
      });
      return pageLayout;
   }
});
