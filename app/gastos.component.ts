import { Component, OnInit } from '@angular/core';

import { DeudasMesComponent,  } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';

import { PlanillaGastosMensuales, PagoMensual, PagosAnualConcepto, PlanillaGastosMensualesFactory, Planilla } from './model/index';
import * as framework from './framework/index';

import { PlanillaGastosMensualesService } from './services/planillaGastosMensuales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * @export
 * @class GastosComponent Main Component
 */
@Component({
    selector: "gastos",
    templateUrl: "app/gastos.component.html",
    providers: [ PlanillaGastosMensualesService, PlanillaGastosMensualesFactory ]
})
export class GastosComponent implements OnInit{
     
    // *** Properties *************************************************
    PlanillaGastosMensuales: PlanillaGastosMensuales;
    Pagos:Array<PagoMensual>;
    PagosPorConcepto: Array<PagosAnualConcepto>;
    MostrarSpinningIcon: boolean = false;
    AniosDisponibles = [2016, 2017];
    Planillas: Planilla[];
    // *** Constructor *************************************************
    /**
     * Creates an instance of GastosComponent.
     * 
     * @param {PlanillaGastosMensualesService} planillaGastosMensualesService
     * 
     * @memberOf GastosComponent
     */
    constructor(private planillaGastosMensualesService: PlanillaGastosMensualesService, 
                private planillaGastosMensualesFactory: PlanillaGastosMensualesFactory,
                private modalService: NgbModal) {
        this.PlanillaGastosMensuales = new PlanillaGastosMensuales();
        this.PagosPorConcepto = new Array<PagosAnualConcepto>();
        this.Planillas = [];
    }

    // *** Public methods *************************************************
    /**
     * implement OnInit's `ngOnInit` method
     * 
     * @memberOf GastosComponent
     */
    ngOnInit(): void {
        this.Inicializar(); 
    }
   
    /**
     * Inicializa la pantalla
     * 
     * @memberOf GastosComponent
     */
    Inicializar(): void {
        const modalRef = this.modalService.open(framework.ProgresoModal);

        if (this.Planillas === undefined || this.Planillas.length === 0) {
            console.log("Obteniendo planillas");
            modalRef.componentInstance.Mensaje = "Buscando planillas";
            this.planillaGastosMensualesService.ObtenerPlanillasDisponibles()
                .subscribe(planillas => {
                    this.Planillas = planillas;
                    console.log( this.Planillas);
                    modalRef.close();
                },
                error => {
                    modalRef.close();
                    console.log(error); 
                });
        }
    }

    /**
     * Obtiene la planilla elegida
     * 
     * @param {Planilla} planilla Datos con la planilla a obtener
     * 
     * @memberOf GastosComponent
     */
    AbrirPlanilla(planilla: Planilla) : void {
        this.ObtenerPlanillaAnioActual(planilla);
    }

    /**
     * Recupera la planilla de gastos mensuales
     * 
     * @param {Planilla} planilla Datos con la planilla a obtener   
     * 
     * @memberOf GastosComponent
     */
    ObtenerPlanillaAnioActual(planilla: Planilla) : void {
        console.log("ObtenerPlanillaGastosMensuales");
        const modalRef = this.modalService.open(framework.ProgresoModal);
         modalRef.componentInstance.Mensaje = "Buscando planilla del año " + planilla.Anio.toString();
         this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
         .subscribe(planilla => {
                        this.PlanillaGastosMensuales = planilla;
                        this.PagosPorConcepto = this.planillaGastosMensualesFactory.ConstruirPagosAnualConcepto(this.PlanillaGastosMensuales);
                        console.log( this.PagosPorConcepto);
                        modalRef.close();
                    }, 
                    error => { 
                         modalRef.close();
                        console.log(error); 
                    });                                      
    }
}
 