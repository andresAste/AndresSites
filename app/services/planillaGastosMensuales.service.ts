import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as model from './../model/index';

@Injectable()
/**
 * Servicio para la planilla de gastos mensuales
 * 
 * @export
 * @class PlanillaGastosMensualesService
 */
export class PlanillaGastosMensualesService {

    /*** Constants and properties *************************************************************************************/
    public ServicesBaseAddress: string ="http://localhost:9090/api/";
    public GoogleDriveService: string ="gastosMensuales/";
    public DropBoxFileService = "dropBox/file/";
    private planillaGastosMensualesFactory: model.iPlanillaGastosMensualesFactory;

    /**
     * Creates an instance of PlanillaGastosMensualesService.
     * 
     * @param {Http} http
     * 
     * @memberOf PlanillaGastosMensualesService
     */
    constructor(private http: Http) { 
    }

    /*** Services exposed  ********************************************************************************************/

    /**
     * Retorna la planilla de gastos mensuales
     * 
     * @returns {Observable<model.PlanillaGastosMensuales>}
     * 
     * @memberOf PlanillaGastosMensualesService
     */
    ObtenerPlanillaGastosMensuales(): Observable<model.PlanillaGastosMensuales> {
         return this.http.get(this.ServicesBaseAddress + this.GoogleDriveService)
                         .map(this.ExtractPlanilla )
                         .catch((error:any) => Observable.throw(error || 'Server error'));
    } 

    /**
     * Actualiza el pago
     * 
     * @param {model.PagoMensual} pago pago a actualizar
     * @returns {Observable<any>}
     * 
     * @memberOf PlanillaGastosMensualesService
     */
    ActualizarPago(pago:model.PagoMensual): Observable<any> {
        let jsonObject: any = 
        {
            Vencimiento: pago.Vencimiento.toLocaleDateString("es-ar"),
            Tentativo: pago.FechaTentativa.toString(),
            Monto: pago.Monto.toString(),
            Pagado: pago.Pagado.toString(),
            PagoAnual: pago.EsPagoAnual.toString(),
            CeldaFila: pago.CeldaFila.toString(),
            CeldaColumna: pago.CeldaColumna.toString()
        }
        console.log("json de pago mensual a enviar:"); console.log(jsonObject);
        return this.http.post(this.ServicesBaseAddress + this.GoogleDriveService + "pago", jsonObject )
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    /**
     * Obtiene un arreglo con las planillas disponibles
     * 
     * @returns {Observable<model.Planilla[]>}
     * 
     * @memberOf PlanillaGastosMensualesService
     */
    ObtenerPlanillasDisponibles(): Observable<model.Planilla[]>{
        return this.http.get(this.ServicesBaseAddress + this.GoogleDriveService + "files")
            .map(function (res: Response) {
                let body = res.json();
                let result = model.Planilla[body.filesFound.length];
                for (let index = 0; index < body.fileFound.length; index++) {
                    result[index] = new model.Planilla(body.fileFound.year, body.fileFound.key);
                }
                console.log("Planillas encontradas:");
                console.log(result);
                return result;
            })
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    /*** private methods *************************************************************************/
    private ExtractPlanilla(res: Response) {
        //TODO: tengo que construir el factory acá, porque parece que el objecto que ejecuta la acción no es PlanillaGastosMensualesService
        if (this.planillaGastosMensualesFactory === undefined) {
            this.planillaGastosMensualesFactory = new model.PlanillaGastosMensualesFactory();
        }
        let body = res.json();
        console.log("resultado sin convertir:");
        console.log(body);
        
        let planilla = this.planillaGastosMensualesFactory.ConstruirPlanillaGastosMensuales(body.errors, body.gastosMensuales.Meses, body.gastosMensuales.Conceptos);
        console.log("resultado convertido:");
        console.log(planilla);

        return planilla || { }; 
    }
}