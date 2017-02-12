
/**
 * Clase que representa una planilla de cálculo
 * 
 * @export
 * @class Planilla
 */
export class Planilla {

    // *** Properties *************************************************
    Anio: number;
    Clave: string;

    // *** Constructor ***************************************************
    
    /**
     * Creates an instance of Planilla.
     * 
     * @param {number} Anio Año de la planilla 
     * @param {string} Clave Clave para obtener la planilla
     * 
     * @memberOf Planilla
     */
    constructor(anio: number, clave: string) {
        this.Anio = anio;
        this.Clave = clave;
    }
}