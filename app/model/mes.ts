import { PagoMensual } from './pagoMensual';
import { ConceptoPago } from './conceptoPago';

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
     * @param {*} jsonObject Javascript JSON object
     * 
     * @memberOf Mes
     */
    constructor(jsonObject: any, conceptos:Array<ConceptoPago>) {
        this.Pagos = new Array<PagoMensual>();
        if (jsonObject !== undefined) {
            this.Mes = jsonObject.Mes;
            jsonObject.Pagos.forEach(jsonPago => {
                this.Pagos.push(new PagoMensual(jsonPago, conceptos));
            });
        }
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

}