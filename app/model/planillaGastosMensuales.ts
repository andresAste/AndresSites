import { ConceptoPago, Mes } from './index';

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
    * @memberOf PlanillaGastosMensuales
    */
    constructor() {
        this.Errores = new Array<string>();
        this.GastosMensualesPorMes = new Array<Mes>();
        this.ConceptosPagos = new Array<ConceptoPago>();
    }
}