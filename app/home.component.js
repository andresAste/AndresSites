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
var planillaGastosMensuales_1 = require('./model/planillaGastosMensuales');
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
    function HomeComponent(planillaGastosMensualesService) {
        this.planillaGastosMensualesService = planillaGastosMensualesService;
        this.PlanillaGastosMensuales = new planillaGastosMensuales_1.PlanillaGastosMensuales();
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
            this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
                .subscribe(function (planilla) { return _this.PlanillaGastosMensuales = planilla; }, function (error) { console.log(error); });
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            templateUrl: "app/home.component.html",
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService]
        }), 
        __metadata('design:paramtypes', [planillaGastosMensuales_service_1.PlanillaGastosMensualesService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map