import { PagoMensual, ConceptoPago } from './index';

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

    // *** Public methods *************************************************
    /**
     * Recupera los pagos del mes que sean válidos (que tengan fecha de vencimiento)
     * 
     * @returns {Array<PagoMensual>}
     * 
     * @memberOf Mes
     */
    ObtenerPagosDelMes(): Array<PagoMensual> {
        let result = new Array<PagoMensual>();

        this.Pagos.forEach(pago => {
            if (pago.EsPagoValido()) {
                result.push(pago);
            }
        });

        return result;
    }

    /**
     * Obtiene el numero correspondiente al mes
     * 
     * @returns {number}
     * 
     * @memberOf Mes
     */
    ObtenerNumeroMes():number {
        let nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return nombresMeses.indexOf(this.Mes);
    }
}