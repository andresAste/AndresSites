"use strict";
var index_1 = require('./index');
/**
 * Clase para cada Concepto que se paga
 *
 * @export
 * @class Concepto
 */
var ConceptoPago = (function () {
    // *** Constructor *****************************************************
    /**
     * Creates an instance of ConceptoPago.
     *
     * @param {*} jsonObject
     *
     * @memberOf ConceptoPago
     */
    function ConceptoPago(jsonObject) {
        this.Concepto = jsonObject.Concepto;
        this.CodigoPago = jsonObject.CodigoPago;
        this.CarpetaDropbox = jsonObject.CarpetaDropbox;
        this.PalabraDropbox = jsonObject.PalabraDropbox;
        this.Origen = this.ObtenerDescripcionDeOrigen(index_1.Origen[jsonObject.Origen.replace(/\s+/g, '')]); //\s is the regex for "whitespace", and g is the "global" flag, meaning match ALL \s (whitespaces). 
    }
    // *** Public methods *****************************************************
    /**
     * Path para subir o descargar el archivo, dado un mes
     *
     * @param {string} mes Mes
     * @returns {string}
     *
     * @memberOf ConceptoPago
     */
    ConceptoPago.prototype.ObtenerPathArchivo = function (mes) {
        return this.CarpetaDropbox.replace(/\//g, "--") + "--" + this.PalabraDropbox + mes + (new Date()).getFullYear();
    };
    // *** Private methods *****************************************************
    /**
     * Genera un string a partir de un valor de Origen
     *
     * @private
     * @param {Origen} origen
     *
     * @memberOf ConceptoPago
     */
    ConceptoPago.prototype.ObtenerDescripcionDeOrigen = function (origen) {
        var descripcion = "";
        switch (origen) {
            case index_1.Origen.Casa:
                descripcion = "Casa";
                break;
            case index_1.Origen.Andres:
                descripcion = "Andres";
                break;
            case index_1.Origen.DepartamentoCordoba:
                descripcion = "Departamento Cordoba";
                break;
            case index_1.Origen.DepartamentoMarcosPaz:
                descripcion = "Departamento Marcos Paz";
                break;
            case index_1.Origen.Natalia:
                descripcion = "Natalia";
                break;
            case index_1.Origen.TerrenoBahia:
                descripcion = "Terreno Bahia";
                break;
            default:
                break;
        }
        return descripcion;
    };
    return ConceptoPago;
}());
exports.ConceptoPago = ConceptoPago;
//# sourceMappingURL=conceptoPago.js.map