import { PagoMensual } from './index';

/**
 * Clase para mostrar la información en un calendario
 * 
 * @exports
 * @class PagosAnualConcepto
 */
export class PagosAnualConcepto {
    
    // *** Properties *************************************************
    /**
     * Pagos anuales para un dado concepto.
     * 
     * @type {Array<PagoMensual>}
     * @memberOf PagosAnualConcepto
     */
    Pagos: Array<PagoMensual>;
    // *** Constructor ************************************************
    /**
     * Creates an instance of PagosAnualConcepto.
     * 
     * 
     * @memberOf PagosAnualConcepto
     */
    constructor() {
        this.Pagos = new Array<PagoMensual>();
    }
}