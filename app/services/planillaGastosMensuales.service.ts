import { Injectable } from '@angular/core';

import { PlanillaGastosMensuales } from './../model/planillaGastosMensuales';
import { PagoMensual } from './../model/pagoMensual';

@Injectable()
/**
 * Servicio para la planilla de gastos mensuales
 * 
 * @export
 * @class PlanillaGastosMensualesService
 */
export class PlanillaGastosMensualesService {
    
    /**
     * Recupera la planilla de gastos mensuales
     * 
     * @returns {PlanillaGastosMensuales}
     * 
     * @memberOf PlanillaGastosMensualesService
     */
    ObtenerPlanillaGastosMensuales(): Promise<PlanillaGastosMensuales> {
        let result = new PlanillaGastosMensuales();
        let pago = new PagoMensual();
        pago.Concepto = "concepto ejemplo";
        pago.EsPagoAnual = false;
        pago.FechaTentativa = false;
        pago.Monto = 12.45;
        pago.Pagado = false;
        pago.Vencimiento = new Date(2016, 12, 10); 

        result.GastosMensuales.push(pago);

        return Promise.resolve(result);
    } 
}