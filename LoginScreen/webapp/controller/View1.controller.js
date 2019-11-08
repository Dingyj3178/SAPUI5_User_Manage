sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function ( Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("LoginScreen.LoginScreen.controller.View1", {
		onInit: function (oEvent) {
			var oViewModel = new JSONModel({
				userId: "",
				password: ""
			});
			this.getView().setModel(oViewModel, "inputModel");
		},

		showdata: function (oEvent) {
			var inputModel = this.getView().getModel("inputModel");
			var userId = inputModel.getProperty("/userId");
			MessageBox.information(
				userId
			);
		}
	});
}
);