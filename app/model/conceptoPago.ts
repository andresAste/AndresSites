import { Origen } from './enums';

/**
 * Clase para cada Concepto que se paga
 * 
 * @export
 * @class Concepto
 */
export class ConceptoPago {

    // *** Properties *************************************************
    Concepto: string;
    CodigoPago: string;
    CarpetaDropbox: string;
    PalabraDropbox: string;
    Origen: string;
    
    // *** Constructor *****************************************************
    /**
     * Creates an instance of ConceptoPago.
     * 
     * @param {*} jsonObject
     * 
     * @memberOf ConceptoPago
     */
    constructor(jsonObject: any) {
        this.Concepto = jsonObject.Concepto;
        this.CodigoPago =jsonObject.CodigoPago;
        this.CarpetaDropbox = jsonObject.CarpetaDropbox;
        this.PalabraDropbox = jsonObject.PalabraDropbox;
        this.Origen = this.ObtenerDescripcionDeOrigen(Origen[(<string>jsonObject.Origen).replace(/\s+/g, '')]); //\s is the regex for "whitespace", and g is the "global" flag, meaning match ALL \s (whitespaces). 
    } 

    // *** Private methods *****************************************************
    /**
     * Genera un string a partir de un valor de Origen
     * 
     * @private
     * @param {Origen} origen
     * 
     * @memberOf ConceptoPago
     */
    private ObtenerDescripcionDeOrigen(origen: Origen) {
        let descripcion = "";

        switch (origen) {
            case Origen.Casa :
                descripcion = "Casa"; break;
            case Origen.Andres :
                descripcion = "Andres"; break;
            case Origen.DepartamentoCordoba :
                descripcion = "Departamento Cordoba"; break;
            case Origen.DepartamentoMarcosPaz :
                descripcion = "Departamento Marcos Paz"; break;
            case Origen.Natalia :
                descripcion = "Natalia"; break;
            case Origen.TerrenoBahia :
                descripcion = "Terreno Bahia"; break;                                                                
            default:
                break;
        }

        return descripcion;
    }
}

