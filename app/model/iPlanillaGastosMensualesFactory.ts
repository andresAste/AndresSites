import { PlanillaGastosMensuales, PagosAnualConcepto} from './index';

/**
 * Interface para la creación de una Planilla de Gastos Mensuales
 * 
 * @export
 * @interface iPlanillaGastosMensualesFactory
 */
export interface iPlanillaGastosMensualesFactory {
    
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
    ConstruirPlanillaGastosMensuales(jsonErrores: any, jsonGastos: any, jsonConceptos:any): PlanillaGastosMensuales;

     /**
     * Construye un arreglo de PagosAnualConcepto
     * 
     * @param {PlanillaGastosMensuales} planillaGastos
     * @returns {Array<PagosAnualConcepto>}
     * 
     * @memberOf PlanillaGastosMensualesFactory
     */
    ConstruirPagosAnualConcepto(planillaGastos: PlanillaGastosMensuales) : Array<PagosAnualConcepto>;
}