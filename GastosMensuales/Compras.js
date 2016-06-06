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

            $("#btnGeCompras").button().on("click", function() {
                GastosMensuales.Compras.GetAllCompras();
            });    

            $("#btnPeriodoAnterior").button().on("click", function() {
                UpdateTableForPeriodo(true);
            });

            $("#btnPeriodoSiguiente").button().on("click", function() {
                UpdateTableForPeriodo(false);
            });


            $("#btnAddCompra").button().on("click", function() {
                    GastosMensuales.Compras.EditCompra.Open();
            });    

            $(document).on({
                ajaxStart: function() {
                    $("body").addClass("gm-loading");
                },
                ajaxStop: function() {
                    $("body").removeClass("gm-loading");
                }
            });

            Compras.EditCompra.Initialize();
        };

        Compras.EditCompra = {
            /**
             * Initializes the dialog
             */
            Initialize: function() {
                GastosMensuales.Compras.EditCompra.EditCompraDialog = $("#AddCompra").dialog({
                  autoOpen: false,
                  //height: 300,
                  //width: 350,
                  modal: true,
                  buttons: {
                    'Agregar': function(){
                        GastosMensuales.Compras.EditCompra.AgregarCompra();
                        $(this).dialog("close");
                    },
                    'Cancelar': function() {
                      $(this).dialog("close");
                    }
                  },
                  close: function() {
                    $(this).dialog("close");
                  }
                });
            },
            /**
              * Clears the form
              */
            ClearCompraPopup : function() {
                $("#tipoPago").val("Super");
                $("#otroTipoPago").val("");
                $("#monto").val("");
            },
            /**
              * Adds a compra
              */
            AgregarCompra: function (){
                var tipoGasto = $("#otroTipoPago").val();
                if ($("#tipoPago").val() != "Otro tipo") {
                    tipoGasto = $("#tipoPago").val();
                }

                var lastCompraOfPeriod = null;
                var detallesOfCurrentPeriod = GastosMensuales.Compras.ComprasEfectuadas.compras[GastosMensuales.Compras.CurrenIndex].Detalle;

                if (detallesOfCurrentPeriod.length > 0)  {
                    lastCompraOfPeriod = detallesOfCurrentPeriod[detallesOfCurrentPeriod.length - 1];
                }

                var result = {
                    compras : [ {
                    TipoGasto:  tipoGasto,
                    Monto:  $("#monto").val(),
                    CeldaFila: parseInt(lastCompraOfPeriod.CeldaFila) + 1,
                    CeldaColumna: parseInt(lastCompraOfPeriod.CeldaColumna),
                    New: true
                    }]
                };

                $.post(ServicesBaseAddress + GoogleDriveService + "compra", 
                       result, 
                       function(data, textStatus, xhr) {
                        var compra = result.compras[0];
                        delete compra.New;
                        detallesOfCurrentPeriod.push(compra);
                        CreateTableForPeriodoCorriente(GastosMensuales.Compras.ComprasEfectuadas.compras[GastosMensuales.Compras.CurrenIndex]);
                       },
                        "json")
                .fail(function(data) {
                    alert("error");
                    console.log(data);
                });
            },
            /**
             * Opens the popup to edit a Pag
             * @param {int} cellRow    number of row
             * @param {int} cellColumn number of column
             */
            Open: function() {
                GastosMensuales.Compras.EditCompra.ClearCompraPopup();
                GastosMensuales.Compras.EditCompra.EditCompraDialog
                        .dialog('open');
            }
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

            compras.Totals = CalculateTotals(compras.Detalle);
            var total = 0;
            compras.Totals.forEach(function (totalItem, totalItemIndex, array) {
              total += totalItem.Total;
            });

            $.each(compras.Detalle, function(compraIndex, compra) {
               rows = rows + GenerateDetalleRow(compra);
            });

            $.each(compras.Totals, function(totalIndex, total) {
               totalRows = totalRows + GenerateTotalRow(total);
            });

            $("#tbComprasDetalle .gm-Fecha").html(compras.Mes + " - " + compras.Anio + " - Total:" + total);
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

        /**
         * Calculate the totals for each type of Compra
         * @param {object} detalles All compras done in a given month
         */
        function CalculateTotals(detalles) {
          var totals = [];
          var categories = ["super", "ropa", "cosas casa", "farmacia","otros gastos"];

          detalles.forEach(function(detalle, index, array) {
            
            var tipoGasto = categories[categories.length-1]; //otros gastos by default
            if (categories.indexOf(detalle.TipoGasto.toLowerCase()) > -1){
              tipoGasto = categories[categories.indexOf(detalle.TipoGasto.toLowerCase())];
            } 

            var comprasForTheTipoGasto = GastosMensuales.Utils.GetItemByProperty(totals, "TipoGasto", tipoGasto);
            if (comprasForTheTipoGasto === null) {
              comprasForTheTipoGasto = {
                TipoGasto: tipoGasto,
                Total: 0
              };
              totals.push(comprasForTheTipoGasto);
            }
            comprasForTheTipoGasto.Total += parseInt(detalle.Monto);
          });

          return totals;
        }

    })(GastosMensuales.Compras || (GastosMensuales.Compras = {}));
})(GastosMensuales || (GastosMensuales = {}));