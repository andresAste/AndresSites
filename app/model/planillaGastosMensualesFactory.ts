import { Injectable } from '@angular/core';

import { iPlanillaGastosMensualesFactory } from './iPlanillaGastosMensualesFactory';
import { PlanillaGastosMensuales } from './planillaGastosMensuales';
import { ConceptoPago } from './conceptoPago';
import { Mes } from './mes';
import { PagoMensual } from './pagoMensual';
import { PagosAnualConcepto } from './pagosAnualConcepto';

@Injectable()
/**
 * Implementación de interfaz iPlanillaGastosMensualesFactory
 * 
 * @export
 * @class planillaGastosMensualesFactory
 * @implements {iPlanillaGastosMensualesFactory}
 */
export class PlanillaGastosMensualesFactory implements iPlanillaGastosMensualesFactory {

    /**
     * Construye una Planilla de Gastos Mensuales 
     * 
     * @param {*} jsonErrores objecto javascript que representa errores
     * @param {*} jsonGastos objecto javascript que representa gastos
     * @param {*} jsonConceptos objecto javascript que representa conceptos de gasto
     * @returns {PlanillaGastosMensuales}
     * 
     * @memberOf iPlanillaGastosMensualesFactory
     */
    ConstruirPlanillaGastosMensuales(jsonErrores: any, jsonGastos: any, jsonConceptos:any): PlanillaGastosMensuales {
        let result = new PlanillaGastosMensuales();

         if (jsonErrores !== undefined) {
            result.Errores = jsonErrores;
        }

        if (jsonConceptos !== undefined) {
            jsonConceptos.forEach(jsonConcepto => {
                result.ConceptosPagos.push(new ConceptoPago(jsonConcepto));
            });
        }

        if (jsonGastos !== undefined) {
            jsonGastos.forEach(jsonGasto => {
                let nuevoMes = new Mes();
                if (jsonGasto !== undefined) {
                    nuevoMes.Mes = jsonGasto.Mes;
                    jsonGasto.Pagos.forEach(jsonPago => {
                        nuevoMes.Pagos.push(new PagoMensual(jsonPago, result.ConceptosPagos));
                    });
                }
                result.GastosMensualesPorMes.push(nuevoMes);
            });
        }

        return result;
    }

    /**
     * Construye un arreglo de PagosAnualConcepto
     * 
     * @param {PlanillaGastosMensuales} planillaGastos
     * @returns {Array<PagosAnualConcepto>}
     * 
     * @memberOf PlanillaGastosMensualesFactory
     */
    ConstruirPagosAnualConcepto(planillaGastos: PlanillaGastosMensuales) : Array<PagosAnualConcepto> {
        let result = new Array<PagosAnualConcepto>(planillaGastos.ConceptosPagos.length);

        let index = 0;
        planillaGastos.ConceptosPagos.forEach(conceptoPago => {
            result[index] = new PagosAnualConcepto();
            //Por cada mes de la planilla, busco el pago para dicho concepto
            planillaGastos.GastosMensualesPorMes.forEach(gastoPorMes => {
                let gastoDelMes = gastoPorMes.Pagos.find(pago => pago.Concepto.Concepto === conceptoPago.Concepto);
                result[index].Pagos.push(gastoDelMes);
            });

            index++;
        });

        return result;
    }
}