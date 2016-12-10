import { Component, Input, ViewChild   } from '@angular/core';

import { Mes, PagoMensual,  ConceptoPago} from './model/index';
import { EditarPagoComponent } from './editarPago.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
        if (!!this.PagosMesActual && this.PagosMesActual.length > 0) {
             this.PagosMesActual.sort((pagoA: PagoMensual, pagoB: PagoMensual) => 
            {
                 return (pagoA.Pagado === pagoB.Pagado)? 0 : pagoA.Pagado? 1 : -1; //si quiero los true primero, cambiar el final por -1:1
            }); 
        }
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
    
    @ViewChild(EditarPagoComponent)
    public readonly EditarPagoComponent: EditarPagoComponent;

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

    // *** constructors *************************************************
    /**
     * Creates an instance of DeudasMesComponent.
     * 
     * 
     * @memberOf DeudasMesComponent
     */
    constructor(private modalService: NgbModal) { 
        this.MesActual = this.NombresDeMes[(new Date()).getMonth()];
    }
}
