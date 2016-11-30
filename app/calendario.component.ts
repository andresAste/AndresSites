import { Component, Input } from '@angular/core';
import { PagosAnualConcepto } from './model/pagosAnualConcepto';

/**
 * Component para el Calendario
 * 
 * @export
 * @class CalendarioComponent
 */
@Component({
    selector: "calendario",
    templateUrl: "app/calendario.component.html",
    styleUrls: ['app/styles/default.css']
})
export class CalendarioComponent {

 // *** Properties *************************************************
    @Input()
    PagosPorConcepto: Array<PagosAnualConcepto>;

 // *** Constructor *************************************************
   /**
    * Creates an instance of CalendarioComponent.
    * 
    * 
    * @memberOf CalendarioComponent
    */
   constructor() {
        this.PagosPorConcepto = new Array<PagosAnualConcepto>();
    }

}