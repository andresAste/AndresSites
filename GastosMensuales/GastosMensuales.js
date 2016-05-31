var GastosMensuales;
(function(GastosMensuales) {
    var ServicesBaseAddress = "http://localhost:9090/api/";
    var DropBoxFileService = "dropBox/file/";
    var GoogleDriveService = "gastosMensuales/";

    // *** PROPERTIES ****************************************************************
    GastosMensuales.GastosMensualesJSON = null;
    GastosMensuales.MesActual = (new Date()).getMonth();
    GastosMensuales.MonthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // *** PUBLIC METHODS ************************************************************
    /**
     * Initializes page
     */
    GastosMensuales.Initialize = function() {
        $("#btnGetGastosMensuales").click(function(event) {
            event.preventDefault(); // cancel default behavior
            GastosMensuales.GetAllGastosMensuales();
        });

        $("#btnMesAnterior").click(function(event) {
            event.preventDefault(); // cancel default behavior
            UpdateTableForMonth(false);
        });

        $("#btnMesSiguiente").click(function(event) {
            event.preventDefault(); // cancel default behavior
            UpdateTableForMonth(true);
        });

        $("#vencimiento").datepicker($.datepicker.regional[ "es" ]);
        
        GastosMensuales.EditPago.Initialize();

        $(document).on({
            ajaxStart: function() {
                $("body").addClass("gm-loading");
            },
            ajaxStop: function() {
                $("body").removeClass("gm-loading");
            }
        });
    };

    GastosMensuales.EditPago = {
        /**
         * Initializes the dialog
         */
        Initialize: function() {
            GastosMensuales.EditPago.EditPagoDialog = $("#editPago").dialog({
              autoOpen: false,
              height: 300,
              width: 350,
              modal: true,
              buttons: {
                'Actualizar': function(){
                    GastosMensuales.EditPago.ActualizarPago($(this).data('pago'));
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
        ClearPagoPopup : function() {
            $("#vencimiento").val("");
            $("#tentativo").prop('checked', false);
            $("#monto").val("");
            $("#pagado").prop('checked', false);
            $("#pagoAnual").prop('checked', false);        
        },
        /**
          * Updates a Pago
          * @param {Object} pago  Pago to edit
          * @param {Object} information Object containing the information to update
          */
        ActualizarPago: function (pago){
            var result = {
                Vencimiento:  $("#vencimiento").val(),
                Tentativo: $("#tentativo").prop('checked'),
                Monto:  $("#monto").val(),
                Pagado:  $("#pagado").prop('checked'),
                PagoAnual:$("#pagoAnual").prop('checked'),
                CeldaFila: pago.CeldaFila,
                CeldaColumna: pago.CeldaColumna
            };

            $.post(ServicesBaseAddress + GoogleDriveService + "pago", 
                   result, 
                   function(data, textStatus, xhr) {
                     pago.Vencimiento = result.Vencimiento;
                     pago.FechaTentativa = result.Tentativo;
                     pago.Monto = result.Monto;
                     pago.Pagado = result.Pagado;
                     pago.EsPagoAnual =  result.PagoAnual;

                     CreateTableForMesCorriente(GastosMensuales.GastosMensualesJSON, GastosMensuales.MesActual);
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
        Open: function(cellRow, cellColumn) {
            GastosMensuales.EditPago.ClearPagoPopup();

            //Get cell being edited
            var pagoToEdit = null;
            $.each(GastosMensuales.GastosMensualesJSON.gastosMensuales.Meses[GastosMensuales.MesActual].Pagos, function(index, pago) {
                if (pago.CeldaFila == cellRow && pago.CeldaColumna == cellColumn) {
                    pagoToEdit = pago;
                };
            }); 

            if (pagoToEdit !== null) {
                $("#vencimiento").val((new Date(pagoToEdit.Vencimiento)).toLocaleDateString("es-ar"));
                $("#tentativo").prop('checked', pagoToEdit.FechaTentativa);
                $("#monto").val(pagoToEdit.Monto);
                $("#pagado").prop('checked', pagoToEdit.Pagado);
                $("#pagoAnual").prop('checked', pagoToEdit.EsPagoAnual);   

                 GastosMensuales.EditPago.EditPagoDialog
                    .data('pago', pagoToEdit)
                    .dialog('open');
            };
        }
    };

    /**
     * Get all Gastos Mensuales
     */
    GastosMensuales.GetAllGastosMensuales = function() {
        var getCall = ServicesBaseAddress + GoogleDriveService;
        $.get(getCall, function(data) {
                GastosMensuales.GastosMensualesJSON = data;
                CreateTableForMesCorriente(data, GastosMensuales.MesActual);
            })
            .fail(function(data) {
                alert("error");
                console.log(data);
                $(".result").html(data.statusText);
            });
    };

    // *** private methods ****************************************************************

    /**
     * Gets next or previous month
     */
    function UpdateTableForMonth(getNextMonth) {
        if (getNextMonth === true && GastosMensuales.MesActual < 11) {
            GastosMensuales.MesActual = GastosMensuales.MesActual + 1;
            CreateTableForMesCorriente(GastosMensuales.GastosMensualesJSON, GastosMensuales.MesActual);
        } else if (getNextMonth === false && GastosMensuales.MesActual > 0) {
            GastosMensuales.MesActual = GastosMensuales.MesActual - 1;
            CreateTableForMesCorriente(GastosMensuales.GastosMensualesJSON, GastosMensuales.MesActual);
        }
    }

    /**
     * Creates HTML  table with the current and previous month
     */
    function CreateTableForMesCorriente(gastosMensualesJSON, currenMonth) {
        var rows = "";

        $.each(gastosMensualesJSON.gastosMensuales.Meses, function(mesIndex, mes) {
            if (mesIndex == currenMonth) {

                var pagosPaidForThisMonth = [];
                var pagosNotPaidForThisMonth = [];
                $.each(mes.Pagos, function(pagoIndex, pago) {
                    pago.ConceptoObject = GetItemByProperty(gastosMensualesJSON.gastosMensuales.Conceptos, "Concepto", pago.Concepto);
                    if (pago.Vencimiento !== "" && (pago.Pagado || pago.EsPagoAnual)) {
                        pagosPaidForThisMonth.push(pago);
                    } else if (pago.Vencimiento !== "" && !(pago.Pagado || pago.EsPagoAnual)) {
                        pagosNotPaidForThisMonth.push(pago);
                    }
                });
                Sort(pagosPaidForThisMonth, "Vencimiento", true, true);
                Sort(pagosNotPaidForThisMonth, "Vencimiento", false, false);

                $.each(pagosNotPaidForThisMonth, function(pagoIndex, pago) {
                    rows = rows + GeneratePagoRow(pago, mes.Mes);
                });
                $.each(pagosPaidForThisMonth, function(pagoIndex, pago) {
                    rows = rows + GeneratePagoRow(pago, mes.Mes);
                });

            }
        });

        $("#tbMesCorriente .gm-MonthName").html(GastosMensuales.MonthName[currenMonth]);
        $("#tbMesCorriente").find("tr:gt(1)").remove();
        $('#tbMesCorriente').append(rows);
        $(".gm-btunUploadComprobantePago").each(function(divIndex, div) {
            var filePath = $(div).attr('data-path');
            UploadComprobantePago(filePath, div);
        });

        $(".btn-EditPago").each(function(index, button) {
            $(button).button().on("click", function() {
                GastosMensuales.EditPago.Open($(this).attr('data-row'), $(this).attr('data-column'));
            });    
        });
    }

    /**
     * Sorting function
     */
    function Sort(arr, prop, reverse, numeric) {
        // Ensure there's a property
        if (!prop || !arr) {
            return arr;
        }

        // Set up sort function
        var sort_by = function(field, rev, primer) {
            // Return the required a,b function
            return function(a, b) {
                // Reset a, b to the field
                a = primer(a[field]), b = primer(b[field]);
                // Do actual sorting, reverse as needed
                return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
            };
        };

        // Distinguish between numeric and string to prevent 100's from coming before smaller
        if (numeric) {

            // Do sort "in place" with sort_by function
            arr.sort(sort_by(prop, reverse, function(a) {

                // - Force value to a string.
                // - Replace any non numeric characters.
                // - Parse as float to allow 0.02 values.
                return parseFloat(String(a).replace(/[^0-9.-]+/g, ''));

            }));
        } else {

            // Do sort "in place" with sort_by function
            arr.sort(sort_by(prop, reverse, function(a) {

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
        });

        return itemFound;
    }

    /**
     * Generates a html table row for a given Pago
     * @param {Pago} pago a procesar
     * @param {String} String representation of a month
     */
    function GeneratePagoRow(pago, mes) {
        var codigoPago = pago.ConceptoObject !== null ? pago.ConceptoObject.CodigoPago : "";
        var origen = pago.ConceptoObject !== null ? pago.ConceptoObject.Origen : "";
        var fechaTentativaSuffix = pago.FechaTentativa ? "(?)" : "";
        var vencimiento = (new Date(pago.Vencimiento)).toLocaleDateString("es-ar") + fechaTentativaSuffix;
        var cssCustom = "";

        if (pago.Pagado) { cssCustom = "gm-PagoRealizado"}
        else if (pago.EsPagoAnual) { cssCustom = "gm-PagoAnualRealizado"};

        //generate link to download comprobante de pago
        var linkDropbox = "";
        if (pago.ConceptoObject !== null && pago.ConceptoObject.CarpetaDropbox !== "") {
            var filePath = pago.ConceptoObject.CarpetaDropbox.replace(/\//g, "--") + "--" + pago.ConceptoObject.PalabraDropbox + mes + (new Date()).getFullYear();
            linkDropbox = "";
            if (pago.Pagado) {
                //Generates an url as follows:  http://localhost:9090/api/dropBox/file/Pagos--ABSA--ABSA_Mayo2016
                var pathComprobantePago = ServicesBaseAddress + DropBoxFileService + filePath;
                linkDropbox = "<a class='gm-linkComprobantePago' href='" + pathComprobantePago + "'>Descargar</a>";
            }

            var btunUploadComprobantePago = "<div class='gm-btunUploadComprobantePago' data-path='" + filePath + "'></div";
            linkDropbox = "<table><tr><td>" + linkDropbox + "</td><td>" + btunUploadComprobantePago + "</td></tr></table>";
        }

        var row = "<tr class=" + cssCustom + ">" +
            "<td><button class='btn-EditPago' data-row='" + pago.CeldaFila + "' data-column='" + pago.CeldaColumna + "'>Edit</button></td>" + 
            "<td>" + pago.Concepto + "</td>" +
            "<td>" + vencimiento + "</td>" +
            "<td>" + pago.Monto + "</td>" +
            "<td>" + pago.Pagado + "</td>" +
            "<td>" + pago.EsPagoAnual + "</td>" +
            "<td>" + codigoPago + "</td>" +
            "<td>" + linkDropbox + "</td>" +
            "<td>" + origen + "</td>" +
            "</tr>";

        return row;
    }

    /**
     * @param {string} file path
     * @param {Div} dib object on which add the file uploader
     */
    function UploadComprobantePago(filePath, div) {
        var uploadURL = ServicesBaseAddress + DropBoxFileService + filePath;

        $(div).uploadFile({
            url: uploadURL,
            multiple: false,
            dragDrop: false,
            fileName: "comprobantePago",
            acceptFiles: ".pdf"
        });
    }

})(GastosMensuales || (GastosMensuales = {}));