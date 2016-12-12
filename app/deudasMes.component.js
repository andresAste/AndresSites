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
var editarPago_component_1 = require('./editarPago.component');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var planillaGastosMensuales_service_1 = require('./services/planillaGastosMensuales.service');
var index_1 = require('./framework/index');
/**
 * Component para Deudas Mes
 *
 * @export
 * @class DeudasMes
 */
var DeudasMesComponent = (function () {
    // *** constructors *************************************************
    /**
     * Creates an instance of DeudasMesComponent.
     *
     *
     * @memberOf DeudasMesComponent
     */
    function DeudasMesComponent(modalService, planillaService) {
        this.modalService = modalService;
        this.planillaService = planillaService;
        /**
         * Arreglo con los meses del año
         *
         *
         * @memberOf DeudasMesComponent
         */
        this.NombresDeMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        this.MesActual = this.NombresDeMes[(new Date()).getMonth()];
    }
    Object.defineProperty(DeudasMesComponent.prototype, "GastosMensualesPorMes", {
        get: function () {
            if (this._gastosMensualesPorMes === undefined) {
                this._gastosMensualesPorMes = new Array();
            }
            return this._gastosMensualesPorMes;
        },
        set: function (gastosObtenidos) {
            var _this = this;
            console.log("ya tenemos  los conceptos?");
            this._gastosMensualesPorMes = gastosObtenidos;
            this._gastosMensualesPorMes.forEach(function (gastoMensual) {
                if (gastoMensual.Mes === _this.MesActual) {
                    console.log("llamando para obtener los pagos reales");
                    console.log(gastoMensual);
                    _this.PagosMesActual = gastoMensual.ObtenerPagosDelMes();
                }
            });
            if (!!this.PagosMesActual && this.PagosMesActual.length > 0) {
                this.PagosMesActual.sort(function (pagoA, pagoB) {
                    if (pagoA.Pagado === pagoB.Pagado) {
                        return pagoA.Vencimiento < pagoB.Vencimiento ? -1 : 1;
                    }
                    else {
                        return pagoA.Pagado ? 1 : -1; //si quiero los true primero, cambiar el final por -1:1
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    // *** Public methods *************************************************
    /**
     * Edita un pago
     *
     * @param {PagoMensual} pago
     *
     * @memberOf DeudasMesComponent
     */
    DeudasMesComponent.prototype.EditarPago = function (pago) {
        var modalRef = this.modalService.open(editarPago_component_1.EditarPagoComponent);
        modalRef.componentInstance.PagoMensual = pago;
    };
    /**
     * Genera un link de pago mensual
     *
     * @param {PagoMensual} pagoMensual
     *
     * @memberOf DeudasMesComponent
     */
    DeudasMesComponent.prototype.GenerarLinkDescargaComprobante = function (pagoMensual) {
        var result = "";
        if (pagoMensual.Concepto.CarpetaDropbox !== "") {
            var pathArchivo = pagoMensual.Concepto.ObtenerPathArchivo(this.MesActual);
            if (pagoMensual.Pagado) {
                //Generates an url as follows:  http://localhost:9090/api/dropBox/file/Pagos--ABSA--ABSA_Mayo2016
                result = this.planillaService.ServicesBaseAddress + this.planillaService.DropBoxFileService + pathArchivo;
            }
        }
        return result;
    };
    /**
     * Abre el popup para subir un archivo
     *
     * @param {PagoMensual} pagoMensual
     *
     * @memberOf DeudasMesComponent
     */
    DeudasMesComponent.prototype.SubirArchivo = function (pagoMensual) {
        var modalRef = this.modalService.open(index_1.ArchivoUploader);
        modalRef.componentInstance.PathArchivo = pagoMensual.Concepto.ObtenerPathArchivo(this.MesActual);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DeudasMesComponent.prototype, "GastosMensualesPorMes", null);
    DeudasMesComponent = __decorate([
        core_1.Component({
            selector: "deudasMes",
            templateUrl: "app/deudasMes.component.html",
            styleUrls: ['app/styles/default.scss'],
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbModal, planillaGastosMensuales_service_1.PlanillaGastosMensualesService])
    ], DeudasMesComponent);
    return DeudasMesComponent;
}());
exports.DeudasMesComponent = DeudasMesComponent;
//# sourceMappingURL=deudasMes.component.js.map