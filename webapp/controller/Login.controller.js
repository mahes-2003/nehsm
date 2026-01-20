sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.kaar.ehsmportal.controller.Login", {
            onInit: function () {

            },

            onLogin: function () {
                var sEmployeeId = this.byId("empIdInput").getValue();
                var sPassword = this.byId("passwordInput").getValue();

                if (!sEmployeeId || !sPassword) {
                    MessageToast.show("Please enter valid credentials");
                    return;
                }

                // Construct Object Path
                // /LOGINSet(EmployeeId='1',Password='123')
                var sPath = "/LOGINSet(EmployeeId='" + sEmployeeId + "',Password='" + sPassword + "')";
                var oModel = this.getOwnerComponent().getModel();

                oModel.read(sPath, {
                    success: function (oData) {
                        if (oData.Status === "Success") {
                            MessageToast.show("Login Successful");
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("RouteDashboard");
                        } else {
                            MessageToast.show("Login Failed");
                        }
                    }.bind(this),
                    error: function (oError) {
                        MessageToast.show("Login Failed or Service Error");
                        // For Mock testing purposes, if direct read fails due to key mismatch, 
                        // one might want to just navigate or check error details.
                        // But strictly we should expect success.
                    }
                });
            }
        });
    });
