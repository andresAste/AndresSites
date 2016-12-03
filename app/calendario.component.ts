import { Component, Input } from '@angular/core';
import { PagosAnualConcepto } from './model/index';

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
   constructor() {
        this.PagosPorConcepto = []; 
    }

}