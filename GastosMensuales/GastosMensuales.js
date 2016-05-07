var GastosMensuales;
(function (GastosMensuales) {
    var ServicesBaseAddress = "http://localhost:9090/api/";
    
    /**
     * Initializes page
     */
    GastosMensuales.Initialize = function () {
        $("#btnGetGastosMensuales").click(function(event) {
            event.preventDefault(); // cancel default behavior
            GastosMensuales.GetAllGastosMensuales();
        });

        $(document).on({
            ajaxStart: function() { $("body").addClass("gm-loading"); },
            ajaxStop: function() { $("body").removeClass("gm-loading"); }    
        });
    };

    /**
     * Get all Gastos Mensuales
     */
    GastosMensuales.GetAllGastosMensuales = function () {
        var getCall = ServicesBaseAddress + "gastosMensuales";
        console.log(getCall);
        $.get( getCall, function( data ) {
           CreateTableForMesCorriente(data);
        })
        .fail(function(data) { 
            alert( "error" ); 
            console.log(data);
            $( ".result" ).html( data.statusText);
        });
    };

    // *** private methods ****************************************************************

    /**
     * Creates HTML  table with the current and previous month
     */
    function CreateTableForMesCorriente(gastosMensualesJSON) {
        var date = new Date();
        var currenMonth = date.getMonth(); 
        var rows = "";

        $.each(gastosMensualesJSON.gastosMensuales.Meses, function(mesIndex, mes) {
            if (mesIndex == currenMonth) {

                var pagosPaidForThisMonth= [];
                var pagosNotPaidForThisMonth= [];
                $.each(mes.Pagos, function (pagoIndex, pago) {
                    pago.ConceptoObject = GetItemByProperty(gastosMensualesJSON.gastosMensuales.Conceptos, "Concepto", pago.Concepto);
                    if (pago.Vencimiento != "" && pago.Pagado) {
                        pagosPaidForThisMonth.push(pago);
                    }
                    else if (pago.Vencimiento != "" && !pago.Pagado) {
                        pagosNotPaidForThisMonth.push(pago);
                    };;
                });                
                Sort(pagosPaidForThisMonth, "Vencimiento", true, true);
                Sort(pagosNotPaidForThisMonth, "Vencimiento", false, false);

                $.each(pagosNotPaidForThisMonth, function (pagoIndex, pago) {
                    rows = rows +  GeneratePagoRow(pago, mes.Mes);           
                });
                $.each(pagosPaidForThisMonth, function (pagoIndex, pago) {
                    rows = rows +  GeneratePagoRow(pago, mes.Mes);                    
                 });

            };
        });
        
        $("#tbMesCorriente").find("tr:gt(0)").remove();
        $('#tbMesCorriente').append(rows);
        debugger;
        $(".gm-Pago").addClass("gm-PagoRealizado");
    }

    /**
     * Sorting function
     */
    function Sort(arr, prop, reverse, numeric) {
        // Ensure there's a property
        if (!prop || !arr) {
            return arr
        }

        // Set up sort function
        var sort_by = function (field, rev, primer) {
            // Return the required a,b function
            return function (a, b) {
                // Reset a, b to the field
                a = primer(a[field]), b = primer(b[field]);
                // Do actual sorting, reverse as needed
                return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
            }
        }

        // Distinguish between numeric and string to prevent 100's from coming before smaller
         if (numeric) {

            // Do sort "in place" with sort_by function
            arr.sort(sort_by(prop, reverse, function (a) {

                // - Force value to a string.
                // - Replace any non numeric characters.
                // - Parse as float to allow 0.02 values.
                return parseFloat(String(a).replace(/[^0-9.-]+/g, ''));

            }));
        } else {

            // Do sort "in place" with sort_by function
            arr.sort(sort_by(prop, reverse, function (a) {

                // - Force value to string.
                return String(a).toUpperCase();
            }));
        }
    }

    /**
     * Returns the first element of the array having property = value
     */
    function GetItemByProperty(itemsArray, property, value) {
        var itemFound = null;
        
        $.each(itemsArray, function(itemIndex, item) {
            for (var key in item) {
                if (item.hasOwnProperty(key) && item[key] == value) {
                    itemFound = item;
                }
            }    
        })
        
        return itemFound;
    }

    /**
     * Generates an HTML row for the given Pago
     */
    function GeneratePagoRow(pago, mes) {
        var codigoPago = pago.ConceptoObject != null ? pago.ConceptoObject.CodigoPago : "";
        var origen = pago.ConceptoObject != null ? pago.ConceptoObject.Origen : "";
        var fechaTentativaSuffix = pago.FechaTentativa ? "(?)" : "";
        var vencimiento = (new Date(pago.Vencimiento)).toLocaleDateString("es-ar") + fechaTentativaSuffix;
        var cssCustom = pago.Pagado ? "gm-Pago" : "";

        //generate link to download comprobante de pago
        var linkDropbox = "";
        if (pago.ConceptoObject != null && pago.Pagado && pago.ConceptoObject.CarpetaDropbox != "") {
            //Generates an url as follows:  http://localhost:9090/api/dropBox/file/Pagos--ABSA--ABSA_Mayo2016
            var pathComprobantePago = ServicesBaseAddress + "dropBox/file/" +  
                                      pago.ConceptoObject.CarpetaDropbox.replace(/\//g, "--") + "--"  + pago.ConceptoObject.PalabraDropbox + mes + (new Date()).getFullYear();
            var linkDropbox = "<a class='gm-linkComprobantePago' href='" + pathComprobantePago + "'>Descargar comprobante de pago</a>"
        };

        var row = "<tr css=" + cssCustom + ">" +
                     "<td>" +  pago.Concepto + "</td>" +
                     "<td>" + vencimiento + "</td>" +
                     "<td>" + pago.Monto + "</td>" +
                     "<td>" +  pago.Pagado + "</td>" +
                     "<td>" + pago.EsPagoAnual + "</td>" +
                     "<td>" + codigoPago + "</td>" +
                     "<td>" + linkDropbox + "</td>" +
                     "<td>" + origen + "</td>" +
                  "</tr>";

        return row;                  
    }

})(GastosMensuales || (GastosMensuales = {}));