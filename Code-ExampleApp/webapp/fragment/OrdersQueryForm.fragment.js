sap.ui.jsfragment("oum.fragment.OrdersQueryForm", {
   createContent: function (oController) {
      const view = oController.getView();
      
      const startDate = new sap.m.DatePicker({
         dateValue: "{/startDate}",
         width: "200px"
      });
      const endDate = new sap.m.DatePicker({
         dateValue: "{/endDate}",
         width: "200px"
      });
      const datesContainer = new sap.ui.layout.form.FormContainer({
         formElements: [
            new sap.ui.layout.form.FormElement({
               label: "{i18n>orders.query.startDate.label}",
               fields: [ startDate ]
            }),
            new sap.ui.layout.form.FormElement({
               label: "{i18n>orders.query.endDate.label}",
               fields: [ endDate ]
            })
         ]
      });

      const statusList = new sap.m.List(view.createId("statusList"), {
         mode: "MultiSelect"
      });
      const statusItem = new sap.m.StandardListItem({
         title: "{statuses>statusText}",
         selected: "{statuses>selected}"
      });
      statusList.bindAggregation("items", {
         path: "statuses>/",
         template: statusItem
      });


      const submitButton = new sap.m.Button({
         width: "140px",
         text: "{i18n>ordersPage.query.submit}",
         tooltip: "{i18n>ordersPage.query.submit}",
         press: function() {
            oController.submitQueryForm();
         }
      });
      
      const statusContainer = new sap.ui.layout.form.FormContainer({
         formElements: [
            new sap.ui.layout.form.FormElement({
               label: "{i18n>orders.query.status}",
               fields: [ statusList ]
            }),
            new sap.ui.layout.form.FormElement({
               label: "{i18n>orders.query.actions}",
               fields: [ submitButton ]
            })
         ]
      });
                         
      const queryForm = new sap.ui.layout.form.Form(view.createId("queryForm"), {
         editable : true,
         visible: false,
         formContainers: [ datesContainer, statusContainer ],
         layout: [
            new sap.ui.layout.form.ResponsiveGridLayout({
               labelSpanL: 3,
               columnsL: 3,
               labelSpanM: 2,
               columnsM: 2
            })
         ],
         toolbar: new sap.m.Toolbar({
            content: [
               new sap.m.Title({
                  text: "{i18n>orders.queryForm.title}"
               }),
               submitButton.clone()
            ]
         })
      });
      return queryForm;
   }
});
