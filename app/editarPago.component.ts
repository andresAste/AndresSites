import { Component, Input, ViewChild   } from '@angular/core'; 
import { FormsModule }   from '@angular/forms';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PagoMensual } from './model/index';
import { PlanillaGastosMensualesService } from './services/planillaGastosMensuales.service';
import * as framework from './framework/index';

declare var $: any;


/**
 * Clase para popup de edición de pagos
 * 
 * @export
 * @class EditarPago
 */
@Component({
    selector: "editar-pago",
    templateUrl: 'app/editarPago.component.html',
    providers: [ PlanillaGastosMensualesService ]
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
    /**
     * Creates an instance of EditarPagoComponent.
     * 
     * @param {NgbActiveModal} activeModal Modal donde mostrar los datos
     * @param {PlanillaGastosMensualesService} planillaService servicio para actualizar pagos
     * 
     * @memberOf EditarPagoComponent
     */
    constructor(public activeModal: NgbActiveModal, private planillaService: PlanillaGastosMensualesService,
               private modalService: NgbModal) {}

    /// *** Event handlers *************************************************
    /**
     * Guarda los cambios para el pago mensual
     * 
     * @memberOf EditarPagoComponent
     */
    GuardarCambios():void {
        this.activeModal.close();
        const modalRef = this.modalService.open(framework.ProgresoModal);
        modalRef.componentInstance.Mensaje = "Guardando pago";
        this.planillaService.ActualizarPago(this.PagoMensual)
         .subscribe(result => { modalRef.close() }, 
                    error => { 
                         modalRef.close();
                        console.log(error); 
                    });  
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