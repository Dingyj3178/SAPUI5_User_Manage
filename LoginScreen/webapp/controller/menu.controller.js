sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox"]
		, function (Controller,MessageBox) {
	"use strict";
	return Controller.extend("LoginScreen.LoginScreen.controller.menu", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf LoginScreen.LoginScreen.view.menu
		 */
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		getApiUrl: function (path) {
			var host = window.location.host;
			var jsHost = ((document.location.protocol === "https:") ? "https://" : "http://");
			//URLリンク
			return jsHost + host + path;
		},
		/**
		 *@memberOf LoginScreen.LoginScreen.controller.menu
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		},
		reqdata: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var url = this.getApiUrl("/menudata");
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				async: false,
				url: url,
				success: function (response, status, xhr) {
					MessageBox.information('success');					
				},
				statusCode: {
					401: function() {
						oRouter.navTo("View1");
					}
				}
			});
		}
	});
});