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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var model = require('./../model/index');
var PlanillaGastosMensualesService = (function () {
    /**
     * Creates an instance of PlanillaGastosMensualesService.
     *
     * @param {Http} http
     *
     * @memberOf PlanillaGastosMensualesService
     */
    function PlanillaGastosMensualesService(http) {
        this.http = http;
        /*** Constants and properties *************************************************************************************/
        this.ServicesBaseAddress = "http://localhost:9090/api/";
        this.GoogleDriveService = "gastosMensuales/";
        this.DropBoxFileService = "dropBox/file/";
    }
    /*** Services exposed  ********************************************************************************************/
    /**
     * Retorna la planilla de gastos mensuales
     *
     * @returns {Observable<model.PlanillaGastosMensuales>}
     *
     * @memberOf PlanillaGastosMensualesService
     */
    PlanillaGastosMensualesService.prototype.ObtenerPlanillaGastosMensuales = function (planilla) {
        return this.http.get(this.ServicesBaseAddress + this.GoogleDriveService + "planilla/" + planilla.Anio)
            .map(this.ExtractPlanilla)
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    /**
     * Actualiza el pago
     *
     * @param {model.PagoMensual} pago pago a actualizar
     * @returns {Observable<any>}
     *
     * @memberOf PlanillaGastosMensualesService
     */
    PlanillaGastosMensualesService.prototype.ActualizarPago = function (pago) {
        var jsonObject = {
            Vencimiento: pago.Vencimiento.toLocaleDateString("es-ar"),
            Tentativo: pago.FechaTentativa.toString(),
            Monto: pago.Monto.toString(),
            Pagado: pago.Pagado.toString(),
            PagoAnual: pago.EsPagoAnual.toString(),
            CeldaFila: pago.CeldaFila.toString(),
            CeldaColumna: pago.CeldaColumna.toString()
        };
        console.log("json de pago mensual a enviar:");
        console.log(jsonObject);
        return this.http.post(this.ServicesBaseAddress + this.GoogleDriveService + "pago", jsonObject)
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    /**
     * Obtiene un arreglo con las planillas disponibles
     *
     * @returns {Observable<model.Planilla[]>}
     *
     * @memberOf PlanillaGastosMensualesService
     */
    PlanillaGastosMensualesService.prototype.ObtenerPlanillasDisponibles = function () {
        return this.http.get(this.ServicesBaseAddress + this.GoogleDriveService + "files")
            .map(function (res) {
            var body = res.json();
            var result = new Array(body.filesFound.length);
            console.log(result);
            for (var index = 0; index < body.filesFound.length; index++) {
                result[index] = new model.Planilla(body.filesFound[index].year, body.filesFound[index].key);
            }
            return result;
        })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    /*** private methods *************************************************************************/
    PlanillaGastosMensualesService.prototype.ExtractPlanilla = function (res) {
        //TODO: tengo que construir el factory acá, porque parece que el objecto que ejecuta la acción no es PlanillaGastosMensualesService
        if (this.planillaGastosMensualesFactory === undefined) {
            this.planillaGastosMensualesFactory = new model.PlanillaGastosMensualesFactory();
        }
        var body = res.json();
        console.log("resultado sin convertir:");
        console.log(body);
        var planilla = this.planillaGastosMensualesFactory.ConstruirPlanillaGastosMensuales(body.errors, body.gastosMensuales.Meses, body.gastosMensuales.Conceptos);
        console.log("resultado convertido:");
        console.log(planilla);
        return planilla || {};
    };
    PlanillaGastosMensualesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlanillaGastosMensualesService);
    return PlanillaGastosMensualesService;
}());
exports.PlanillaGastosMensualesService = PlanillaGastosMensualesService;
//# sourceMappingURL=planillaGastosMensuales.service.js.map