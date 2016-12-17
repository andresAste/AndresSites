import { Component, Input, ViewChild   } from '@angular/core';

import { Mes, PagoMensual,  ConceptoPago} from './model/index';
import { EditarPagoComponent } from './editarPago.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillaGastosMensualesService } from './services/planillaGastosMensuales.service';
import { ArchivoUploader } from './framework/index';

/**
 * Component para Deudas Mes
 * 
 * @export
 * @class DeudasMes
 */
@Component({
    selector: "deudasMes",
    templateUrl: "app/deudasMes.component.html",
    styleUrls: ['app/styles/default.scss'],
    providers: [ PlanillaGastosMensualesService ]
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
                if  (pagoA.Pagado === pagoB.Pagado)
                {
                    return pagoA.Vencimiento < pagoB.Vencimiento ? -1 : 1;
                } else {
                     return pagoA.Pagado? 1 : -1; //si quiero los true primero, cambiar el final por -1:1
                }
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

    // *** constructors *************************************************
    /**
     * Creates an instance of DeudasMesComponent.
     * 
     * 
     * @memberOf DeudasMesComponent
     */
    constructor(private modalService: NgbModal, private planillaService: PlanillaGastosMensualesService) { 
        this.MesActual = this.NombresDeMes[(new Date()).getMonth()];
    }

    // *** Public methods *************************************************
    
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

    /**
     * Genera un link de pago mensual
     * 
     * @param {PagoMensual} pagoMensual
     * 
     * @memberOf DeudasMesComponent
     */
    GenerarLinkDescargaComprobante(pagoMensual: PagoMensual) {
        let result = "";
        if (pagoMensual.Concepto.CarpetaDropbox !== ""){
            let pathArchivo = pagoMensual.Concepto.ObtenerPathArchivo(this.MesActual); 
            if (pagoMensual.Pagado) {
                //Generates an url as follows:  http://localhost:9090/api/dropBox/file/Pagos--ABSA--ABSA_Mayo2016
                result = this.planillaService.ServicesBaseAddress + this.planillaService.DropBoxFileService + pathArchivo;
            }
        }

        return result;
    }

   /**
    * Indica si hay tiene link para archivos
    * 
    * @param {PagoMensual} pagoMensual
    * @returns
    * 
    * @memberOf DeudasMesComponent
    */
   TieneLinksParaSubirArchivos(pagoMensual: PagoMensual) {
        return (pagoMensual.Concepto.CarpetaDropbox !== "");
    }

    /**
     * Abre el popup para subir un archivo
     * 
     * @param {PagoMensual} pagoMensual
     * 
     * @memberOf DeudasMesComponent
     */
    SubirArchivo(pagoMensual: PagoMensual): void {
        const modalRef = this.modalService.open(ArchivoUploader);
        modalRef.componentInstance.PathArchivo = pagoMensual.Concepto.ObtenerPathArchivo(this.MesActual);
    }

    /**
     * Actualiza el mes que se muestra en la pantalla
     * 
     * @param {string} mes
     * 
     * @memberOf DeudasMesComponent
     */
    ActualizarMes(mes:string) {
        this.MesActual = mes;
        this.GastosMensualesPorMes = this._gastosMensualesPorMes; //esto refresca la propiedad PagosMesActual
    }

      /**
     * Dado un pago mensual, indica que estilo aplicar
     * 
     * @param {PagoMensual} pago
     * @returns {string}
     * 
     * @memberOf CalendarioComponent
     */
    EstiloDePago(pago: PagoMensual): string {
        if (pago.Pagado === true) {
            return "gm-card-pagoRealizado";
        }
        else if (pago.EsPagoAnual == true) {
            return "gm-card-pagoAnual";
        }
        else {
            return "gm-card-pagoFaltante";
        }
    }

}
