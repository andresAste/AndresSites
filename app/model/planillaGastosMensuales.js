"use strict";
/**
 * Clase que contiene la información de una planilla de Gastos Mensuales
 *
 * @export
 * @class PlanillGastosMensuales
 */
var PlanillaGastosMensuales = (function () {
    // *** constructors *************************************************
    /**
     * Creates an instance of PlanillaGastosMensuales.
     *
     * @memberOf PlanillaGastosMensuales
     */
    function PlanillaGastosMensuales() {
        this.Errores = new Array();
        this.GastosMensualesPorMes = new Array();
        this.ConceptosPagos = new Array();
    }
    return PlanillaGastosMensuales;
}());
exports.PlanillaGastosMensuales = PlanillaGastosMensuales;
//# sourceMappingURL=planillaGastosMensuales.js.map