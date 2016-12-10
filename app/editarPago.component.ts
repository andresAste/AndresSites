import { Component, Input, ViewChild   } from '@angular/core'; 
import { FormsModule }   from '@angular/forms';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PagoMensual } from './model/index';
declare var $: any;


/**
 * Clase para popup de edición de pagos
 * 
 * @export
 * @class EditarPago
 */
@Component({
    selector: "editar-pago",
    templateUrl: 'app/editarPago.component.html'
})
export class EditarPagoComponent {

    /// *** Properties  *************************************************
    /**
     * Pago Mensual a editar
     * 
     * @type {PagoMensual}
     * @memberOf EditarPago
     */
    private _pagoMensual : PagoMensual;
    get PagoMensual(): PagoMensual {
        return this._pagoMensual;
    }
    set PagoMensual(pago: PagoMensual) {
        this._pagoMensual = pago;
        this.PagoMensualOriginal =$.extend(true, {}, pago);
    }

    private PagoMensualOriginal : PagoMensual;

    /// *** Constructor *************************************************
    constructor(public activeModal: NgbActiveModal) {}

    /// *** Event handlers *************************************************
    /**
     * Guarda los cambios para el pago mensual
     * 
     * @memberOf EditarPagoComponent
     */
    GuardarCambios():void {
        this.activeModal.close();
    }

    /**
     * Cierra el popup sin guardar cambios
     * 
     * @memberOf EditarPagoComponent
     */
    Cerrar():void {
        $.extend(true, this.PagoMensual, this.PagoMensualOriginal);
        //this.PagoMensual = this.PagoMensualOriginal;
        this.activeModal.close();
    }
}