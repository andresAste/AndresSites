var GastosMensuales;
(function(GastosMensuales) {
    (function(Compras) {
        var ServicesBaseAddress = "http://localhost:9090/api/";
        var GoogleDriveService = "gastosMensuales/";
        // *** PROPERTIES *********************************************************************
        Compras.ComprasEfectuadas = null;
        Compras.CurrenIndex = 0;
        // *** PUBLIC METHODS *****************************************************************
        /**
         * Initializes page
         */
        Compras.Initialize = function() {

            $("#btnGeCompras").click(function(event) {
                event.preventDefault(); // cancel default behavior
                GastosMensuales.Compras.GetAllCompras();
            });    

            $("#btnPeriodoAnterior").click(function(event) {
                event.preventDefault(); // cancel default behavior
                UpdateTableForPeriodo(true);
            });

            $("#btnPeriodoSiguiente").click(function(event) {
                event.preventDefault(); // cancel default behavior
                UpdateTableForPeriodo(false);
            });

            $(document).on({
                ajaxStart: function() {
                    $("body").addClass("gm-loading");
                },
                ajaxStop: function() {
                    $("body").removeClass("gm-loading");
                }
            });
        };

        /**
         * Get all Compras
         */
        Compras.GetAllCompras = function() {
            var getCall = ServicesBaseAddress + GoogleDriveService + "compras";
            $.get(getCall, function(data) {
                    GastosMensuales.Compras.ComprasEfectuadas= data;
                    GastosMensuales.Compras.CurrenIndex = data.compras.length - 1;
                    CreateTableForPeriodoCorriente(data.compras[GastosMensuales.Compras.CurrenIndex]);
                })
                .fail(function(data) {
                    alert("error");
                    console.log(data);
                    $(".result").html(data.statusText);
                });
        };

        // *** private methods ****************************************************************
        
        function  UpdateTableForPeriodo(previousPeriodo) {
            if (previousPeriodo === false && GastosMensuales.Compras.CurrenIndex + 1 < GastosMensuales.Compras.ComprasEfectuadas.compras.length) {
                GastosMensuales.Compras.CurrenIndex = GastosMensuales.Compras.CurrenIndex + 1;
                CreateTableForPeriodoCorriente(GastosMensuales.Compras.ComprasEfectuadas.compras[GastosMensuales.Compras.CurrenIndex]);
            }
            else if (previousPeriodo === true && GastosMensuales.Compras.CurrenIndex > 0) {
                GastosMensuales.Compras.CurrenIndex = GastosMensuales.Compras.CurrenIndex - 1;
                CreateTableForPeriodoCorriente(GastosMensuales.Compras.ComprasEfectuadas.compras[GastosMensuales.Compras.CurrenIndex]);
            }
        }

        /**
         * Creates HTML  table with the current period
         */
        function CreateTableForPeriodoCorriente(compras, index) {
            var rows = "";
            var totalRows = "";

            $.each(compras.Detalle, function(compraIndex, compra) {
               rows = rows + GenerateDetalleRow(compra);
            });

            $.each(compras.Totals, function(totalIndex, total) {
               totalRows = totalRows + GenerateTotalRow(total);
            });

            $("#tbComprasDetalle .gm-Fecha").html(compras.Mes + " - " + compras.Anio);
            $("#tbDetalle").find("tr:gt(0)").remove();
            $('#tbDetalle').append(rows);
            $("#tbTotales").find("tr:gt(0)").remove();
            $('#tbTotales').append(totalRows);
        }

        /**
         * Generates a html table row for a given Compra
         * @param {Object} compra a procesar
         */
        function GenerateDetalleRow(compra) {
            var row = "<tr>" +
                "<td></td>" + 
                "<td>" + compra.TipoGasto + "</td>" +
                "<td>" + compra.Monto + "</td>" +
                "</tr>";

            return row;
        }

        /**
         * Generates a html table row for a given Total
         * @param {Object} total Total to process
         */
        function GenerateTotalRow(total) {
             var row = "<tr>" +
                "<td>" + total.TipoGasto + "</td>" +
                "<td>" + total.Total + "</td>" +
                "</tr>";

            return row;
        }

    })(GastosMensuales.Compras || (GastosMensuales.Compras = {}));
})(GastosMensuales || (GastosMensuales = {}));