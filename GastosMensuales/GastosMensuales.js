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
          $( ".result" ).html( data );
        })
        .fail(function(data) { 
            alert( "error" ); 
            console.log(data);
            $( ".result" ).html( data.statusText);
        });
    };

})(GastosMensuales || (GastosMensuales = {}));