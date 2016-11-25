import { Component, Input  } from '@angular/core';

import { PagoMensual } from './model/pagoMensual';

/**
 * Component para Deudas Mes
 * 
 * @export
 * @class DeudasMes
 */
@Component({
    selector: "deudasMes",
    templateUrl: "app/deudasMes.component.html"
})
export class DeudasMesComponent {

    // *** Properties *************************************************
     @Input()
    GastosMensuales: Array<PagoMensual>;

    // *** constructors *************************************************
    constructor() {
        this.GastosMensuales = new Array<PagoMensual>();
    }

}
