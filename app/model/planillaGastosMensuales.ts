import { ConceptoPago } from './conceptoPago';
import { Mes } from './mes';

/**
 * Clase que contiene la información de una planilla de Gastos Mensuales
 * 
 * @export
 * @class PlanillGastosMensuales
 */
export class PlanillaGastosMensuales {
 
    // *** Properties *************************************************
    Errores : Array<string>;
    GastosMensualesPorMes: Array<Mes>;
    ConceptosPagos: Array<ConceptoPago>;

    // *** constructors *************************************************
   
   /**
    * Creates an instance of PlanillaGastosMensuales.
    * 
    * @param {*} jsonErrores objecto javascript que representa errores
    * @param {*} jsonGastos objecto javascript que representa gastos
    * @param {*} jsonConceptos objecto javascript que representa conceptos de gasto
    * 
    * @memberOf PlanillaGastosMensuales
    */
    constructor(jsonErrores: any, jsonGastos: any, jsonConceptos:any) {
        this.Errores = new Array<string>();
        this.GastosMensualesPorMes = new Array<Mes>();
        this.ConceptosPagos = new Array<ConceptoPago>();

        if (jsonErrores !== undefined) {
            this.Errores = jsonErrores;
        }

        if (jsonConceptos !== undefined) {
            jsonConceptos.forEach(jsonConcepto => {
                this.ConceptosPagos.push(new ConceptoPago(jsonConcepto));
            });
        }

        if (jsonGastos !== undefined) {
            jsonGastos.forEach(jsonGasto => {
                this.GastosMensualesPorMes.push(new Mes(jsonGasto, this.ConceptosPagos));
            });
        }

      
    }
}