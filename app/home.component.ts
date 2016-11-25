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
        if (this.PlanillaGastosMensuales === undefined || this.PlanillaGastosMensuales.GastosMensuales.length === 0) {
            console.log("recuperando planilla de gastos mensuales");
            this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
                                               .then(planilla =>
                                               {
                                                   this.PlanillaGastosMensuales = planilla;
                                               }); 
            console.log("planilla de gastos mensuales recuperada");
        }
    }
}
 