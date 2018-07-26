sap.ui.define([ 'jquery.sap.global', 'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel', 'sap/m/MessagePopover',
		'sap/m/MessagePopoverItem', "sap/ui/core/UIComponent",
		'sap/ui/model/Filter', 'sap/ui/model/Sorter',
		"sap/ui/layout/form/SimpleForm" ], function(jQuery, Controller,
		JSONModel, MessagePopover, MessagePopoverItem, UIComponent, Filter,
		Sorter, SimpleForm) {
	"use strict";

	return Controller
			.extend("SplitApp.controller.Master",
					{

						onInit : function() {
							var oModel = new JSONModel();
							oModel.loadData("model/Employees.json");

							// var oList = this.byId("MasterData");//referencing
							// the table table0
							// oList.setModel(oModel, "data");
							sap.ui.getCore().byId("master").setModel(oModel,
									"data");

							this.bGrouped = false;
							this.bDescending = false;

						},

						onItemPressed : function(oEvent) {
							/*
							 * var oSelectedItem =
							 * this.byId("idList").getSelectedItem(); var
							 * Context =
							 * oSelectedItem.getBindingContext("data"); var
							 * myObject =Context.getObject();
							 * 
							 * var odetail = sap.ui.getCore().byId("detail");
							 * odetail.setBindingContext(myObject,"data");
							 */

							var oContext = oEvent.getParameter("listItem")
									.getBindingContext("data").getProperty();
							var oDetail = sap.ui.getCore().byId("detail");
							var displayModel = new JSONModel(oContext);
							oDetail.setModel(displayModel);
							oDetail.byId("tools").setVisible(true);
							oDetail.byId("headerPanel").setVisible(true);

							/*
							 * UIComponent.getRouterFor(this).navTo("object", {
							 * objectId:
							 * oEvent.getSource().getBindingContext("data").getProperty("ID")
							 * });
							 */

						},
						onFilter : function(oEvent) {

							var aFilters = [];
							this.sSearchQuery = oEvent.getSource().getValue();
							if (this.sSearchQuery) {
								var oFilter = new Filter("Info/Name",
										sap.ui.model.FilterOperator.Contains,
										this.sSearchQuery);
								aFilters.push(oFilter);
							}
							this.getView().byId("idList").getBinding("items")
									.filter(aFilters);

						},
						_fnGroup : function(oContext) {
							var hName = oContext.getProperty("Info/House");

							return {
								key : hName,
								text : hName
							};
						},
						onSort : function(oEvent) {
							var aSorters = [];

							this.bDescending = !this.bDescending;

							if (this.bGrouped) {
								aSorters.push(new Sorter("Info/Name",
										this.bDescending, this._fnGroup));
							} else {
								aSorters.push(new Sorter("Info/Name",
										this.bDescending));
							}

							this.getView().byId("idList").getBinding("items")
									.sort(aSorters);

						},
						onGroup : function(oEvent) {
							this.bGrouped = !this.bGrouped;

							var aSorters = [];

							if (this.bGrouped) {
								aSorters.push(new Sorter("Info/House",
										this.bDescending, this._fnGroup));
							} else {
								aSorters.push(new Sorter("Info/Name",
										this.bDescending));
							}

							this.getView().byId("idList").getBinding("items")
									.sort(aSorters);
						},
						onReset : function(oEvent) {
							var aSorters = [];
							var aFilters = [];
							this.bGrouped = false;
							this.bDescending = false;
							this.sSearchQuery = 0;

							if (this.bGrouped) {
								aSorters.push(new Sorter("Info/House",
										this.bDescending, this._fnGroup));
							} else {
								aSorters.push(new Sorter("Info/Name",
										this.bDescending));
							}

							if (this.sSearchQuery) {
								var oFilter = new Filter("Info/Name",
										sap.ui.model.FilterOperator.Contains,
										this.sSearchQuery);
								aFilters.push(oFilter);
							}

							this.getView().byId("idList").getBinding("items")
									.sort(aSorters);
							this.getView().byId("idList").getBinding("items")
									.filter(aFilters);
						},

					});

});