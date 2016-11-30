"use strict";
/**
 * Clase para un mes
 *
 * @export
 * @class Mes
 */
var Mes = (function () {
    // *** Constructor *************************************************
    /**
     * Creates an instance of Mes.
     *
     *
     * @memberOf Mes
     */
    function Mes() {
        this.Pagos = new Array();
    }
    // *** Public methods *************************************************
    /**
     * Recupera los pagos del mes que sean válidos (que tengan fecha de vencimiento)
     *
     * @returns {Array<PagoMensual>}
     *
     * @memberOf Mes
     */
    Mes.prototype.ObtenerPagosDelMes = function () {
        var result = new Array();
        this.Pagos.forEach(function (pago) {
            if (pago.EsPagoValido()) {
                result.push(pago);
            }
        });
        return result;
    };
    /**
     * Obtiene el numero correspondiente al mes
     *
     * @returns {number}
     *
     * @memberOf Mes
     */
    Mes.prototype.ObtenerNumeroMes = function () {
        var nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return nombresMeses.indexOf(this.Mes);
    };
    return Mes;
}());
exports.Mes = Mes;
//# sourceMappingURL=mes.js.map