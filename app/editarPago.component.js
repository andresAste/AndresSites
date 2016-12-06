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
var index_1 = require('./framework/index');
/**
 * Clase para popup de edición de pagos
 *
 * @export
 * @class EditarPago
 */
var EditarPagoComponent = (function () {
    function EditarPagoComponent() {
    }
    Object.defineProperty(EditarPagoComponent.prototype, "PagoMensual", {
        get: function () {
            return this._pagoMensual;
        },
        set: function (pago) {
            this._pagoMensual = pago;
            this.modal.show();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(index_1.ModalComponent), 
        __metadata('design:type', index_1.ModalComponent)
    ], EditarPagoComponent.prototype, "modal", void 0);
    EditarPagoComponent = __decorate([
        core_1.Component({
            selector: "editar-pago",
            templateUrl: 'app/editarPago.component.html',
            styleUrls: ['app/styles/default.scss', 'node_modules/bootstrap/dist/css/bootstrap.min.css']
        }), 
        __metadata('design:paramtypes', [])
    ], EditarPagoComponent);
    return EditarPagoComponent;
}());
exports.EditarPagoComponent = EditarPagoComponent;
//# sourceMappingURL=editarPago.component.js.map