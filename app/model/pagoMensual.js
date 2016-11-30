"use strict";
/**
 * Pago Mensual
 *
 * @export
 * @class PagoMensual
 */
var PagoMensual = (function () {
    // *** Constructor *****************************************************
    function PagoMensual(jsonObject, conceptos) {
        this.Concepto = conceptos.filter(function (concepto) { return concepto.Concepto === jsonObject.Concepto; })[0];
        this.Monto = Number(jsonObject.Monto);
        this.Vencimiento = new Date(jsonObject.Vencimiento);
        if (this.Vencimiento.toString().toLowerCase() === "Invalid Date".toLowerCase()) {
            this.Vencimiento = undefined;
        }
        this.FechaTentativa = jsonObject.FechaTentativa;
        this.Pagado = jsonObject.Pagado;
        this.EsPagoAnual = jsonObject.EsPagoAnual;
        this.CeldaFila = jsonObject.CeldaFila;
        this.CeldaColumna = jsonObject.CeldaColumna;
    }
    // *** Métodos *****************************************************
    /**
     * Determina si es un pago válido para un mes (si tiene vencimiento)
     *
     * @returns {boolean}
     *
     * @memberOf PagoMensual
     */
    PagoMensual.prototype.EsPagoValido = function () {
        return this.Vencimiento !== undefined && this.Vencimiento.toString() !== "";
    };
    return PagoMensual;
}());
exports.PagoMensual = PagoMensual;
//# sourceMappingURL=pagoMensual.js.map