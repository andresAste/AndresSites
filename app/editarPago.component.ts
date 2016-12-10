import { Component, Input, ViewChild   } from '@angular/core'; 
import { FormsModule }   from '@angular/forms';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PagoMensual } from './model/index';


/**
 * Clase para popup de edición de pagos
 * 
 * @export
 * @class EditarPago
 */
@Component({
    selector: "editar-pago",
    templateUrl: 'app/editarPago.component.html',
    styleUrls: ['app/styles/default.scss', 'node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class EditarPagoComponent {

    /// *** Properties  *************************************************
    /**
     * Pago Mensual a editar
     * 
     * @type {PagoMensual}
     * @memberOf EditarPago
     */
    private _pagoMensual: PagoMensual;
    get PagoMensual(): PagoMensual {
        return this._pagoMensual;
    }
    set PagoMensual(pago: PagoMensual) {
        this._pagoMensual = pago;
    }
    /// *** Constructor *************************************************
    constructor(public activeModal: NgbActiveModal) {}
}