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
        this.IDPlanillaSeleccionada = null;
        this.PlanillaGastosMensuales = new index_1.PlanillaGastosMensuales();
        this.PagosPorConcepto = new Array();
        this.Planillas = [];
    }
    // *** Public methods *************************************************
    /**
     * implement OnInit's `ngOnInit` method
     *
     * @memberOf GastosComponent
     */
    GastosComponent.prototype.ngOnInit = function () {
        this.Inicializar();
    };
    /**
     * Inicializa la pantalla
     *
     * @memberOf GastosComponent
     */
    GastosComponent.prototype.Inicializar = function () {
        var _this = this;
        var modalRef = this.modalService.open(framework.ProgresoModal);
        if (this.Planillas === undefined || this.Planillas.length === 0) {
            console.log("Obteniendo planillas");
            modalRef.componentInstance.Mensaje = "Buscando planillas";
            this.planillaGastosMensualesService.ObtenerPlanillasDisponibles()
                .subscribe(function (planillas) {
                _this.Planillas = planillas;
                console.log(_this.Planillas);
                modalRef.close();
            }, function (error) {
                modalRef.close();
                console.log(error);
            });
        }
    };
    /**
     * Obtiene la planilla elegida
     *
     * @param {Planilla} planilla Datos con la planilla a obtener
     *
     * @memberOf GastosComponent
     */
    GastosComponent.prototype.AbrirPlanilla = function (planilla) {
        this.ObtenerPlanillaAnioActual(planilla);
    };
    /**
     * Recupera la planilla de gastos mensuales
     *
     * @param {Planilla} planilla Datos con la planilla a obtener
     *
     * @memberOf GastosComponent
     */
    GastosComponent.prototype.ObtenerPlanillaAnioActual = function (planillaElegida) {
        var _this = this;
        console.log("ObtenerPlanillaGastosMensuales");
        var modalRef = this.modalService.open(framework.ProgresoModal);
        this.IDPlanillaSeleccionada = planillaElegida.Clave;
        modalRef.componentInstance.Mensaje = "Buscando planilla del año " + planillaElegida.Anio.toString();
        this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales(planillaElegida)
            .subscribe(function (planilla) {
            _this.PlanillaGastosMensuales = planilla;
            _this.PagosPorConcepto = _this.planillaGastosMensualesFactory.ConstruirPagosAnualConcepto(_this.PlanillaGastosMensuales);
            console.log(_this.PagosPorConcepto);
            modalRef.close();
        }, function (error) {
            modalRef.close();
            console.log(error);
        });
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