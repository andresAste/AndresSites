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
var index_1 = require('./index');
var PlanillaGastosMensualesFactory = (function () {
    function PlanillaGastosMensualesFactory() {
    }
    /**
     * Construye una Planilla de Gastos Mensuales
     *
     * @param {*} jsonErrores objecto javascript que representa errores
     * @param {*} jsonGastos objecto javascript que representa gastos
     * @param {*} jsonConceptos objecto javascript que representa conceptos de gasto
     * @returns {PlanillaGastosMensuales}
     *
     * @memberOf iPlanillaGastosMensualesFactory
     */
    PlanillaGastosMensualesFactory.prototype.ConstruirPlanillaGastosMensuales = function (jsonErrores, jsonGastos, jsonConceptos) {
        var result = new index_1.PlanillaGastosMensuales();
        if (jsonErrores !== undefined) {
            result.Errores = jsonErrores;
        }
        if (jsonConceptos !== undefined) {
            jsonConceptos.forEach(function (jsonConcepto) {
                result.ConceptosPagos.push(new index_1.ConceptoPago(jsonConcepto));
            });
        }
        if (jsonGastos !== undefined) {
            jsonGastos.forEach(function (jsonGasto) {
                var nuevoMes = new index_1.Mes();
                if (jsonGasto !== undefined) {
                    nuevoMes.Mes = jsonGasto.Mes;
                    jsonGasto.Pagos.forEach(function (jsonPago) {
                        nuevoMes.Pagos.push(new index_1.PagoMensual(jsonPago, result.ConceptosPagos));
                    });
                }
                result.GastosMensualesPorMes.push(nuevoMes);
            });
        }
        return result;
    };
    /**
     * Construye un arreglo de PagosAnualConcepto
     *
     * @param {PlanillaGastosMensuales} planillaGastos
     * @returns {Array<PagosAnualConcepto>}
     *
     * @memberOf PlanillaGastosMensualesFactory
     */
    PlanillaGastosMensualesFactory.prototype.ConstruirPagosAnualConcepto = function (planillaGastos) {
        var result = new Array(planillaGastos.ConceptosPagos.length);
        var index = 0;
        planillaGastos.ConceptosPagos.forEach(function (conceptoPago) {
            result[index] = new index_1.PagosAnualConcepto();
            //Por cada mes de la planilla, busco el pago para dicho concepto
            planillaGastos.GastosMensualesPorMes.forEach(function (gastoPorMes) {
                var gastoDelMes = gastoPorMes.Pagos.find(function (pago) { return pago.Concepto.Concepto === conceptoPago.Concepto; });
                result[index].Pagos.push(gastoDelMes);
            });
            index++;
        });
        return result;
    };
    PlanillaGastosMensualesFactory = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlanillaGastosMensualesFactory);
    return PlanillaGastosMensualesFactory;
}());
exports.PlanillaGastosMensualesFactory = PlanillaGastosMensualesFactory;
//# sourceMappingURL=planillaGastosMensualesFactory.js.map