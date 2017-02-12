import { Component, OnInit } from '@angular/core';

import { DeudasMesComponent,  } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';

import { PlanillaGastosMensuales, PagoMensual, PagosAnualConcepto, PlanillaGastosMensualesFactory } from './model/index';
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
    }

    // *** Public methods *************************************************
    /**
     * implement OnInit's `ngOnInit` method
     * 
     * @memberOf GastosComponent
     */
    ngOnInit(): void {
        this.ObtenerPlanillaGastosMensuales(); 
    }

    /**
     * Recupera la planilla de gastos mensuales
     * @memberOf GastosComponent
     */
    ObtenerPlanillaGastosMensuales(): void {
        console.log("ObtenerPlanillaGastosMensuales");
        if (this.PlanillaGastosMensuales === undefined || this.PlanillaGastosMensuales.GastosMensualesPorMes.length === 0) {
         const modalRef = this.modalService.open(framework.ProgresoModal);
         modalRef.componentInstance.Mensaje = "Buscando planilla";
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
}
 