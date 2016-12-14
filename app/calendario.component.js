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
/**
 * Component para el Calendario
 *
 * @export
 * @class CalendarioComponent
 */
var CalendarioComponent = (function () {
    // *** Constructor *************************************************
    /**
     * Creates an instance of CalendarioComponent.
     *
     *
     * @memberOf CalendarioComponent
     */
    function CalendarioComponent(modalService) {
        this.modalService = modalService;
        this.PagosPorConcepto = [];
    }
    // *** Metodos *************************************************
    /**
     * Edita un pago
     *
     * @param {PagoMensual} pago
     *
     * @memberOf DeudasMesComponent
     */
    CalendarioComponent.prototype.EditarPago = function (pago) {
        var modalRef = this.modalService.open(editarPago_component_1.EditarPagoComponent);
        modalRef.componentInstance.PagoMensual = pago;
    };
    /**
     * Dado un pago mensual, indica que estilo aplicar
     *
     * @param {PagoMensual} pago
     * @returns {string}
     *
     * @memberOf CalendarioComponent
     */
    CalendarioComponent.prototype.EstiloDePago = function (pago) {
        if (pago.Pagado === true) {
            return "gm-card-pagoRealizado";
        }
        else if (pago.EsPagoAnual == true) {
            return "gm-card-pagoAnual";
        }
        else {
            return "gm-card-pagoFaltante";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CalendarioComponent.prototype, "PagosPorConcepto", void 0);
    CalendarioComponent = __decorate([
        core_1.Component({
            selector: "calendario",
            templateUrl: "app/calendario.component.html",
            styleUrls: ['app/styles/default.scss']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbModal])
    ], CalendarioComponent);
    return CalendarioComponent;
}());
exports.CalendarioComponent = CalendarioComponent;
//# sourceMappingURL=calendario.component.js.map