"use strict";
/**
 * Clase que representa una planilla de cálculo
 *
 * @export
 * @class Planilla
 */
var Planilla = (function () {
    // *** Constructor ***************************************************
    /**
     * Creates an instance of Planilla.
     *
     * @param {number} Anio Año de la planilla
     * @param {string} Clave Clave para obtener la planilla
     *
     * @memberOf Planilla
     */
    function Planilla(anio, clave) {
        this.Anio = anio;
        this.Clave = clave;
    }
    return Planilla;
}());
exports.Planilla = Planilla;
//# sourceMappingURL=planilla.js.map