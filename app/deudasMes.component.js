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
    function DeudasMesComponent() {
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
                    return (pagoA.Pagado === pagoB.Pagado) ? 0 : pagoA.Pagado ? 1 : -1; //si quiero los true primero, cambiar el final por -1:1
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Edita un pago
     *
     * @param {PagoMensual} pago
     *
     * @memberOf DeudasMesComponent
     */
    DeudasMesComponent.prototype.EditarPago = function (pago) {
        this.EditarPagoComponent.PagoMensual = pago;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DeudasMesComponent.prototype, "GastosMensualesPorMes", null);
    __decorate([
        core_1.ViewChild(editarPago_component_1.EditarPagoComponent), 
        __metadata('design:type', editarPago_component_1.EditarPagoComponent)
    ], DeudasMesComponent.prototype, "EditarPagoComponent", void 0);
    DeudasMesComponent = __decorate([
        core_1.Component({
            selector: "deudasMes",
            templateUrl: "app/deudasMes.component.html",
            styleUrls: ['app/styles/default.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], DeudasMesComponent);
    return DeudasMesComponent;
}());
exports.DeudasMesComponent = DeudasMesComponent;
//# sourceMappingURL=deudasMes.component.js.map