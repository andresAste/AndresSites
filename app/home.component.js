"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('./model/index');
var planillaGastosMensuales_service_1 = require('./services/planillaGastosMensuales.service');
/**
 * @export
 * @class HomeComponent Main Component
 */
var HomeComponent = (function () {
    // *** Constructor *************************************************
    /**
     * Creates an instance of HomeComponent.
     *
     * @param {PlanillaGastosMensualesService} planillaGastosMensualesService
     *
     * @memberOf HomeComponent
     */
    function HomeComponent(planillaGastosMensualesService, planillaGastosMensualesFactory) {
        this.planillaGastosMensualesService = planillaGastosMensualesService;
        this.planillaGastosMensualesFactory = planillaGastosMensualesFactory;
        this.MostrarSpinningIcon = false;
        this.PlanillaGastosMensuales = new index_1.PlanillaGastosMensuales();
        this.PagosPorConcepto = new Array();
    }
    // *** Public methods *************************************************
    /**
     * implement OnInit's `ngOnInit` method
     *
     * @memberOf HomeComponent
     */
    HomeComponent.prototype.ngOnInit = function () {
        this.ObtenerPlanillaGastosMensuales();
    };
    /**
     * Recupera la planilla de gastos mensuales
     * @memberOf HomeComponent
     */
    HomeComponent.prototype.ObtenerPlanillaGastosMensuales = function () {
        var _this = this;
        console.log("ObtenerPlanillaGastosMensuales");
        if (this.PlanillaGastosMensuales === undefined || this.PlanillaGastosMensuales.GastosMensualesPorMes.length === 0) {
            this.MostrarSpinningIcon = true;
            this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
                .subscribe(function (planilla) {
                _this.PlanillaGastosMensuales = planilla;
                _this.PagosPorConcepto = _this.planillaGastosMensualesFactory.ConstruirPagosAnualConcepto(_this.PlanillaGastosMensuales);
                console.log(_this.PagosPorConcepto);
                _this.MostrarSpinningIcon = false;
            }, function (error) {
                _this.MostrarSpinningIcon = false;
                console.log(error);
            });
        }
    };
    // *** Event handlers ***************************************************
    HomeComponent.prototype.log = function (selectedTab) {
        console.log('Selected Tab with title: ' + selectedTab.TabTitle);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            templateUrl: "app/home.component.html",
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService, index_1.PlanillaGastosMensualesFactory]
        }), 
        __metadata('design:paramtypes', [planillaGastosMensuales_service_1.PlanillaGastosMensualesService, index_1.PlanillaGastosMensualesFactory])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map