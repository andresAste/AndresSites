import { PagoMensual } from './pagoMensual';

/**
 * Clase para un mes
 * 
 * @export
 * @class Mes
 */
export class Mes {

    // *** Properties *************************************************
    Pagos: Array<PagoMensual>;
    Mes: string;

    // *** Constructor *************************************************
    
    /**
     * Creates an instance of Mes.
     * 
     * 
     * @memberOf Mes
     */
    constructor() {
        this.Pagos = new Array<PagoMensual>();
    }

}