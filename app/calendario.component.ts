import { Component, Input } from '@angular/core';
import { PagosAnualConcepto, PagoMensual } from './model/index';
import { EditarPagoComponent } from './editarPago.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Component para el Calendario
 * 
 * @export
 * @class CalendarioComponent
 */
@Component({
    selector: "calendario",
    templateUrl: "app/calendario.component.html",
    styleUrls: ['app/styles/default.scss']
})
export class CalendarioComponent {

 // *** Properties *************************************************
    @Input()
    PagosPorConcepto: PagosAnualConcepto[];

  // *** Constructor *************************************************
   /**
    * Creates an instance of CalendarioComponent.
    * 
    * 
    * @memberOf CalendarioComponent
    */
   constructor(private modalService: NgbModal) {
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
    EditarPago(pago: PagoMensual): void {
        const modalRef = this.modalService.open(EditarPagoComponent);
        modalRef.componentInstance.PagoMensual = pago;
    }

}