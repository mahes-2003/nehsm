sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.kaar.ehsmportal.controller.IncidentManagement", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteIncidentManagement").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function () {
                var oModel = this.getOwnerComponent().getModel();
                var that = this;

                // Fetch data manually to bypass ODataModel key issues
                oModel.read("/incidentSet", {
                    filters: [new Filter("EmployeeId", FilterOperator.EQ, "00000001")],
                    success: function (oData) {
                        // Robustly handle response: check for results array or use data directly
                        var aResults = (oData && oData.results) ? oData.results : oData;

                        // Ensure it's an array
                        if (!Array.isArray(aResults)) {
                            aResults = [aResults];
                        }

                        var oJsonModel = new JSONModel({ results: aResults });
                        that.getView().setModel(oJsonModel, "incidentModel");
                    },
                    error: function (oError) {
                        // Handle error
                    }
                });
            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteDashboard", {}, true);
                }
            }
        });
    });
