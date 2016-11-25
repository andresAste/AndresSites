import { ConceptoPago } from './conceptoPago';
import { PagoMensual } from './pagoMensual';

/**
 * Clase que contiene la información de una planilla de Gastos Mensuales
 * 
 * @export
 * @class PlanillGastosMensuales
 */
export class PlanillaGastosMensuales {
 
    // *** Properties *************************************************
    Errores : Array<string>;
    GastosMensuales: Array<PagoMensual>;
    ConceptosPagos: Array<ConceptoPago>;

    // *** constructors *************************************************
    constructor() {
        this.Errores = new Array<string>();
        this.GastosMensuales = new Array<PagoMensual>();
        this.ConceptosPagos = new Array<ConceptoPago>();
    }
}