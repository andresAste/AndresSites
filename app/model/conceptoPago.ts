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
    Origen: Origen;
}

