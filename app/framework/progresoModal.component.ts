import { Component } from '@angular/core';
import { FadingCircleComponent } from 'ng2-spin-kit-new/app/spinner/fading-circle'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Clase que muestra un mensaje de progreso
 * 
 * @export
 * @class ProgresoModal
 */
@Component({
    selector: "progreso-modal",
    template: `
        <div class="modal-header">
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <span>{{Mensaje}}</span>
            <sk-fading-circle [delay]="0">
            </sk-fading-circle>            
        </div>
    ` 
})
export class ProgresoModal {
   
   /// **** Properties ************************************************************
   Mensaje: string;

   /// **** Constructor ************************************************************
   /**
    * Creates an instance of ProgresoModal.
    * 
    * @param {NgbActiveModal} activeModal
    * 
    * @memberOf ProgresoModal
    */
   constructor(public activeModal: NgbActiveModal) {

   }
}