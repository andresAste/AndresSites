import { Component, OnInit } from '@angular/core';

import { DeudasMesComponent } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';

import { PlanillaGastosMensuales } from './model/planillaGastosMensuales';
import { PagoMensual } from './model/pagoMensual';

import { PlanillaGastosMensualesService } from './services/planillaGastosMensuales.service';

/**
 * @export
 * @class HomeComponent Main Component
 */
@Component({
    selector: "home",
    templateUrl: "app/home.component.html",
    providers: [ PlanillaGastosMensualesService ]
})
export class HomeComponent implements OnInit{
     
    // *** Properties *************************************************
    PlanillaGastosMensuales: PlanillaGastosMensuales;
    Pagos:Array<PagoMensual>;
    // *** Constructor *************************************************
    /**
     * Creates an instance of HomeComponent.
     * 
     * @param {PlanillaGastosMensualesService} planillaGastosMensualesService
     * 
     * @memberOf HomeComponent
     */
    constructor(private planillaGastosMensualesService: PlanillaGastosMensualesService) {
        this.PlanillaGastosMensuales = new PlanillaGastosMensuales();
    }

    // *** Public methods *************************************************
    /**
     * implement OnInit's `ngOnInit` method
     * 
     * @memberOf HomeComponent
     */
    ngOnInit(): void {
        this.ObtenerPlanillaGastosMensuales(); 
    }

    /**
     * Recupera la planilla de gastos mensuales
     * @memberOf HomeComponent
     */
    ObtenerPlanillaGastosMensuales(): void {
        console.log("ObtenerPlanillaGastosMensuales");
        if (this.PlanillaGastosMensuales === undefined || this.PlanillaGastosMensuales.GastosMensualesPorMes.length === 0) {
         this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
         .subscribe(planilla => this.PlanillaGastosMensuales = planilla, 
                    error => { console.log(error); });                                      
        }
    }
}
 