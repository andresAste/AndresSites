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
var planillaGastosMensuales_1 = require('./../model/planillaGastosMensuales');
var pagoMensual_1 = require('./../model/pagoMensual');
var PlanillaGastosMensualesService = (function () {
    function PlanillaGastosMensualesService() {
    }
    /**
     * Recupera la planilla de gastos mensuales
     *
     * @returns {PlanillaGastosMensuales}
     *
     * @memberOf PlanillaGastosMensualesService
     */
    PlanillaGastosMensualesService.prototype.ObtenerPlanillaGastosMensuales = function () {
        var result = new planillaGastosMensuales_1.PlanillaGastosMensuales();
        var pago = new pagoMensual_1.PagoMensual();
        pago.Concepto = "concepto ejemplo";
        pago.EsPagoAnual = false;
        pago.FechaTentativa = false;
        pago.Monto = 12.45;
        pago.Pagado = false;
        pago.Vencimiento = new Date(2016, 12, 10);
        result.GastosMensuales.push(pago);
        return Promise.resolve(result);
    };
    PlanillaGastosMensualesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlanillaGastosMensualesService);
    return PlanillaGastosMensualesService;
}());
exports.PlanillaGastosMensualesService = PlanillaGastosMensualesService;
//# sourceMappingURL=planillaGastosMensuales.service.js.map