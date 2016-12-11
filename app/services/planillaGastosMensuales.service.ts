import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PlanillaGastosMensuales } from './../model/planillaGastosMensuales';
import { PagoMensual } from './../model/pagoMensual';
import { Mes } from './../model/mes';
import { PlanillaGastosMensualesFactory } from './../model/planillaGastosMensualesFactory';
import { iPlanillaGastosMensualesFactory } from './../model/iPlanillaGastosMensualesFactory';
import { PagosAnualConcepto } from './../model/pagosAnualConcepto';

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
    private planillaGastosMensualesFactory: iPlanillaGastosMensualesFactory;

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
     * @returns {Observable<PlanillaGastosMensuales>}
     * 
     * @memberOf PlanillaGastosMensualesService
     */
    ObtenerPlanillaGastosMensuales(): Observable<PlanillaGastosMensuales> {
         return this.http.get(this.ServicesBaseAddress + this.GoogleDriveService)
                         .map(this.ExtractPlanilla )
                         .catch((error:any) => Observable.throw(error || 'Server error'));
    } 

    ActualizarPago(pago:PagoMensual): Observable<any> {
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

    /*** private methods *************************************************************************/
    private ExtractPlanilla(res: Response) {
        //TODO: tengo que construir el factory acá, porque parece que el objecto que ejecuta la acción no es PlanillaGastosMensualesService
        if (this.planillaGastosMensualesFactory === undefined) {
            this.planillaGastosMensualesFactory = new PlanillaGastosMensualesFactory();
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