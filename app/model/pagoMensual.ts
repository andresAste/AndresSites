import { ConceptoPago } from './index';

/**
 * Pago Mensual
 * 
 * @export
 * @class PagoMensual
 */
export class PagoMensual {

    // *** Properties *************************************************
    Concepto: ConceptoPago;
    Monto: number;
    Vencimiento: Date;
    FechaTentativa: boolean;
    Pagado:boolean;
    EsPagoAnual:boolean;
    CeldaFila:number;
    CeldaColumna:number

    // *** Constructor *****************************************************
    constructor(jsonObject: any, conceptos: Array<ConceptoPago>) {
        this.Concepto = conceptos.filter(concepto => concepto.Concepto === jsonObject.Concepto)[0];
        this.Monto = Number(jsonObject.Monto);
        this.Vencimiento = new Date(jsonObject.Vencimiento);
        if (this.Vencimiento.toString().toLowerCase() === "Invalid Date".toLowerCase()) {
            this.Vencimiento = undefined;
        }
        this.FechaTentativa = jsonObject.FechaTentativa;
        this.Pagado = jsonObject.Pagado;
        this.EsPagoAnual = jsonObject.EsPagoAnual;
        this.CeldaFila = jsonObject.CeldaFila;
        this.CeldaColumna = jsonObject.CeldaColumna;
    } 

    // *** Métodos *****************************************************
    /**
     * Determina si es un pago válido para un mes (si tiene vencimiento)
     * 
     * @returns {boolean}
     * 
     * @memberOf PagoMensual
     */
    EsPagoValido() : boolean {
        return this.Vencimiento !== undefined &&  this.Vencimiento.toString() !== "";
    }
}