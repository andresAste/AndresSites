
/**
 * Pago Mensual
 * 
 * @export
 * @class PagoMensual
 */
export class PagoMensual {

    // *** Properties *************************************************
    Concepto: string;
    Monto: number;
    Vencimiento: Date;
    FechaTentativa: boolean;
    Pagado:boolean;
    EsPagoAnual:boolean;
    CeldaFila:number;
    CeldaColumna:number

}