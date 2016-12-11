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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var planillaGastosMensuales_service_1 = require('./services/planillaGastosMensuales.service');
var framework = require('./framework/index');
/**
 * Clase para popup de edición de pagos
 *
 * @export
 * @class EditarPago
 */
var EditarPagoComponent = (function () {
    /// *** Constructor *************************************************
    /**
     * Creates an instance of EditarPagoComponent.
     *
     * @param {NgbActiveModal} activeModal Modal donde mostrar los datos
     * @param {PlanillaGastosMensualesService} planillaService servicio para actualizar pagos
     *
     * @memberOf EditarPagoComponent
     */
    function EditarPagoComponent(activeModal, planillaService, modalService) {
        this.activeModal = activeModal;
        this.planillaService = planillaService;
        this.modalService = modalService;
    }
    Object.defineProperty(EditarPagoComponent.prototype, "PagoMensual", {
        get: function () {
            return this._pagoMensual;
        },
        set: function (pago) {
            this._pagoMensual = pago;
            this.PagoMensualOriginal = $.extend(true, {}, pago);
        },
        enumerable: true,
        configurable: true
    });
    /// *** Event handlers *************************************************
    /**
     * Guarda los cambios para el pago mensual
     *
     * @memberOf EditarPagoComponent
     */
    EditarPagoComponent.prototype.GuardarCambios = function () {
        this.activeModal.close();
        var modalRef = this.modalService.open(framework.ProgresoModal);
        modalRef.componentInstance.Mensaje = "Guardando pago";
        this.planillaService.ActualizarPago(this.PagoMensual)
            .subscribe(function (result) { modalRef.close(); }, function (error) {
            modalRef.close();
            console.log(error);
        });
    };
    /**
     * Cierra el popup sin guardar cambios
     *
     * @memberOf EditarPagoComponent
     */
    EditarPagoComponent.prototype.Cerrar = function () {
        $.extend(true, this.PagoMensual, this.PagoMensualOriginal);
        //this.PagoMensual = this.PagoMensualOriginal;
        this.activeModal.close();
    };
    EditarPagoComponent = __decorate([
        core_1.Component({
            selector: "editar-pago",
            templateUrl: 'app/editarPago.component.html',
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, planillaGastosMensuales_service_1.PlanillaGastosMensualesService, ng_bootstrap_1.NgbModal])
    ], EditarPagoComponent);
    return EditarPagoComponent;
}());
exports.EditarPagoComponent = EditarPagoComponent;
//# sourceMappingURL=editarPago.component.js.map