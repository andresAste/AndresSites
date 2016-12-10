import { ConceptoPago } from './index';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    private _vencimiento :Date;
    get Vencimiento():Date{
        return this._vencimiento;
    }
    set Vencimiento(vencimiento: Date) {
        this._vencimiento = vencimiento;
        if (!!this._vencimiento) {
            this._vencimientoModel =  
            {
                year: this._vencimiento.getFullYear(),
                month: this._vencimiento.getMonth() + 1,
                day: this._vencimiento.getDate()
            };
        }
    }
    FechaTentativa: boolean;
    Pagado:boolean;
    EsPagoAnual:boolean;
    CeldaFila:number;
    CeldaColumna:number;
    private _vencimientoModel: NgbDateStruct ;
    get VencimientoModel(): NgbDateStruct {
        return this._vencimientoModel;
    }
    set VencimientoModel(model:NgbDateStruct) {
        this._vencimientoModel = model;
        if (!!this._vencimientoModel) {
            this._vencimiento = new Date(this._vencimientoModel.year, this._vencimientoModel.month-1, this._vencimientoModel.day);
        }
    }

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

    /**
     * Retorna el mínimo día del mes
     * 
     * @returns {NgbDateStruct}
     * 
     * @memberOf PagoMensual
     */
    MinimoDiaDelMes() : NgbDateStruct {
        var result =  
        {
            year: this.VencimientoModel.year,
            month: this.VencimientoModel.month,
            day: 1
        };
        return result;
    }

    /**
     * Retorna el máximo día del mes
     * 
     * @returns {NgbDateStruct}
     * 
     * @memberOf PagoMensual
     */
    MaximoDiaDelMes() : NgbDateStruct {
        var result =  
        {
            year: this.VencimientoModel.year,
            month: this.VencimientoModel.month,
            day: ( new Date(this.VencimientoModel.year, this.VencimientoModel.month, 0).getDate())
        };
        return result;
    }
}