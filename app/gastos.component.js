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
var framework = require('./framework/index');
var planillaGastosMensuales_service_1 = require('./services/planillaGastosMensuales.service');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
/**
 * @export
 * @class GastosComponent Main Component
 */
var GastosComponent = (function () {
    // *** Constructor *************************************************
    /**
     * Creates an instance of GastosComponent.
     *
     * @param {PlanillaGastosMensualesService} planillaGastosMensualesService
     *
     * @memberOf GastosComponent
     */
    function GastosComponent(planillaGastosMensualesService, planillaGastosMensualesFactory, modalService) {
        this.planillaGastosMensualesService = planillaGastosMensualesService;
        this.planillaGastosMensualesFactory = planillaGastosMensualesFactory;
        this.modalService = modalService;
        this.MostrarSpinningIcon = false;
        this.AniosDisponibles = [2016, 2017];
        this.PlanillaGastosMensuales = new index_1.PlanillaGastosMensuales();
        this.PagosPorConcepto = new Array();
    }
    // *** Public methods *************************************************
    /**
     * implement OnInit's `ngOnInit` method
     *
     * @memberOf GastosComponent
     */
    GastosComponent.prototype.ngOnInit = function () {
        this.ObtenerPlanillaGastosMensuales();
    };
    /**
     * Recupera la planilla de gastos mensuales
     * @memberOf GastosComponent
     */
    GastosComponent.prototype.ObtenerPlanillaGastosMensuales = function () {
        var _this = this;
        console.log("ObtenerPlanillaGastosMensuales");
        if (this.PlanillaGastosMensuales === undefined || this.PlanillaGastosMensuales.GastosMensualesPorMes.length === 0) {
            var modalRef_1 = this.modalService.open(framework.ProgresoModal);
            modalRef_1.componentInstance.Mensaje = "Buscando planilla";
            this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
                .subscribe(function (planilla) {
                _this.PlanillaGastosMensuales = planilla;
                _this.PagosPorConcepto = _this.planillaGastosMensualesFactory.ConstruirPagosAnualConcepto(_this.PlanillaGastosMensuales);
                console.log(_this.PagosPorConcepto);
                modalRef_1.close();
            }, function (error) {
                modalRef_1.close();
                console.log(error);
            });
        }
    };
    GastosComponent = __decorate([
        core_1.Component({
            selector: "gastos",
            templateUrl: "app/gastos.component.html",
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService, index_1.PlanillaGastosMensualesFactory]
        }), 
        __metadata('design:paramtypes', [planillaGastosMensuales_service_1.PlanillaGastosMensualesService, index_1.PlanillaGastosMensualesFactory, ng_bootstrap_1.NgbModal])
    ], GastosComponent);
    return GastosComponent;
}());
exports.GastosComponent = GastosComponent;
//# sourceMappingURL=gastos.component.js.map