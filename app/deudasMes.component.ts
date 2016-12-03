import { Component, Input  } from '@angular/core';

import { Mes, PagoMensual,  ConceptoPago} from './model/index';

/**
 * Component para Deudas Mes
 * 
 * @export
 * @class DeudasMes
 */
@Component({
    selector: "deudasMes",
    templateUrl: "app/deudasMes.component.html",
    styleUrls: ['app/styles/default.scss']
})
export class DeudasMesComponent {

    // *** Properties *************************************************
     
    /**
     * Gastos mensuales por mes
     * 
     * @private
     * @type {Array<Mes>}
     * @memberOf DeudasMesComponent
     */
    private _gastosMensualesPorMes: Array<Mes>;
    @Input()
    get GastosMensualesPorMes(): Array<Mes> {
        if (this._gastosMensualesPorMes === undefined) {
            this._gastosMensualesPorMes = new Array<Mes>();
        }
        return this._gastosMensualesPorMes
    }
    set GastosMensualesPorMes(gastosObtenidos:Array<Mes>) {
        console.log("ya tenemos  los conceptos?");
        this._gastosMensualesPorMes = gastosObtenidos;
        this._gastosMensualesPorMes.forEach(gastoMensual => {
            if (gastoMensual.Mes === this.MesActual) {
                console.log("llamando para obtener los pagos reales");
                console.log(gastoMensual);
                this.PagosMesActual = gastoMensual.ObtenerPagosDelMes();
            }
        });
    }

    /**
     * Mes actual
     * 
     * @type {string}
     * @memberOf DeudasMesComponent
     */
    MesActual: string;
    
    /**
     * Arreglo con los pagos del mes
     * 
     * @type {Array<PagoMensual>}
     * @memberOf DeudasMesComponent
     */
    PagosMesActual: Array<PagoMensual>;
    
    /**
     * Arreglo con los meses del año
     * 
     * 
     * @memberOf DeudasMesComponent
     */
    NombresDeMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    // *** constructors *************************************************
    /**
     * Creates an instance of DeudasMesComponent.
     * 
     * 
     * @memberOf DeudasMesComponent
     */
    constructor() { 
        this.MesActual = this.NombresDeMes[(new Date()).getMonth()];
    }

}
