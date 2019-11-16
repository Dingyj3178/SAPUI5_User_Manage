sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("LoginScreen.LoginScreen.controller.View1", {
		onInit: function (oEvent) {
			var oViewModel = new JSONModel({
				userId: "",
				password: ""
			});
			this.getView().setModel(oViewModel, "inputModel");
			// this.oRouter = this.getOwnerComponent().getRouter();
		},
		getApiUrl: function (path) {
			var host = window.location.host;
			var jsHost = ((document.location.protocol === "https:") ? "https://" : "http://");
			//URLリンク
			return jsHost + host + path;
		},
		showdata: function (oEvent) {
				var inputModel = this.getView().getModel("inputModel");
				var postBody = {
					"userId": inputModel.getProperty("/userId"),
					"password": inputModel.getProperty("/password")
				};
				var url = this.getApiUrl("/login");
				jQuery.ajax({
					type: "POST",
					contentType: "application/json",
					async: false,
					url: url,
					data: JSON.stringify(postBody),
					success: function (response, status, xhr) {
						// MessageBox.information('success');
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("t_menu");
					}
				});
			}
			// showdata: function (oEvent) {
			// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 	oRouter.navTo("t_menu");
			// }
	});
});