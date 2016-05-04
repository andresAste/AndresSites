var GastosMensuales;
(function (GastosMensuales) {
    var ServicesBaseAddress = "http://localhost:9090/Services/";
    
    /**
     * Initializes page
     */
    GastosMensuales.Initialize = function () {
        $("#btnGetGastosMensuales").click(function(event) {
            event.preventDefault(); // cancel default behavior
            GastosMensuales.GetAllGastosMensuales();
        });
    };

    /**
     * Get all Gastos Mensuales
     */
    GastosMensuales.GetAllGastosMensuales = function () {
        var getCall = ServicesBaseAddress + "GastosMensuales";
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

                var pagosforThisMonth= [];
                $.each(mes.Pagos, function (pagoIndex, pago) {
                    if (pago.Vencimiento != "") {
                        pagosforThisMonth.push(pago);
                    };
                });                

                Sort(pagosforThisMonth, "Pagado", false, false);

                $.each(pagosforThisMonth, function (pagoIndex, pago) {
                    var newRow = "<tr>" + 
                                     "<td>" + pago.Concepto + "</td>" +
                                     "<td>" + pago.Vencimiento + "</td>" +
                                     "<td>" + pago.Monto + "</td>" +
                                     "<td>" + pago.Pagado + "</td>" +
                                     "<td>" + pago.EsPagoAnual + "</td>" +
                                 "</tr>";
                    rows = rows +  newRow;           
                });
            };
        });
        
        $("#tbMesCorriente").find("tr:gt(0)").remove();
        $('#tbMesCorriente').append(rows);
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


})(GastosMensuales || (GastosMensuales = {}));