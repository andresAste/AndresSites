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
    Object.defineProperty(PagoMensual.prototype, "Vencimiento", {
        get: function () {
            return this._vencimiento;
        },
        set: function (vencimiento) {
            this._vencimiento = vencimiento;
            if (!!this._vencimiento) {
                this._vencimientoModel =
                    {
                        year: this._vencimiento.getFullYear(),
                        month: this._vencimiento.getMonth() + 1,
                        day: this._vencimiento.getDate()
                    };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagoMensual.prototype, "VencimientoModel", {
        get: function () {
            return this._vencimientoModel;
        },
        set: function (model) {
            this._vencimientoModel = model;
            if (!!this._vencimientoModel) {
                this._vencimiento = new Date(this._vencimientoModel.year, this._vencimientoModel.month - 1, this._vencimientoModel.day);
            }
        },
        enumerable: true,
        configurable: true
    });
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
    /**
     * Retorna el mínimo día del mes
     *
     * @returns {NgbDateStruct}
     *
     * @memberOf PagoMensual
     */
    PagoMensual.prototype.MinimoDiaDelMes = function () {
        var result = {
            year: this.VencimientoModel.year,
            month: this.VencimientoModel.month,
            day: 1
        };
        return result;
    };
    /**
     * Retorna el máximo día del mes
     *
     * @returns {NgbDateStruct}
     *
     * @memberOf PagoMensual
     */
    PagoMensual.prototype.MaximoDiaDelMes = function () {
        var result = {
            year: this.VencimientoModel.year,
            month: this.VencimientoModel.month,
            day: (new Date(this.VencimientoModel.year, this.VencimientoModel.month, 0).getDate())
        };
        return result;
    };
    return PagoMensual;
}());
exports.PagoMensual = PagoMensual;
//# sourceMappingURL=pagoMensual.js.map