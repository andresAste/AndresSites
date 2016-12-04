import { Component, OnInit } from '@angular/core';

import { DeudasMesComponent,  } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';
import { iTab, TabsComponent, TabComponent } from './framework/index';

import { PlanillaGastosMensuales, PagoMensual, PagosAnualConcepto, PlanillaGastosMensualesFactory } from './model/index';

import { PlanillaGastosMensualesService } from './services/planillaGastosMensuales.service';

import {FadingCircleComponent} from 'ng2-spin-kit-new/app/spinner/fading-circle'

/**
 * @export
 * @class HomeComponent Main Component
 */
@Component({
    selector: "home",
    templateUrl: "app/home.component.html",
    providers: [ PlanillaGastosMensualesService, PlanillaGastosMensualesFactory ]
})
export class HomeComponent implements OnInit{
     
    // *** Properties *************************************************
    PlanillaGastosMensuales: PlanillaGastosMensuales;
    Pagos:Array<PagoMensual>;
    PagosPorConcepto: Array<PagosAnualConcepto>;
    MostrarSpinningIcon: boolean = false;
    // *** Constructor *************************************************
    /**
     * Creates an instance of HomeComponent.
     * 
     * @param {PlanillaGastosMensualesService} planillaGastosMensualesService
     * 
     * @memberOf HomeComponent
     */
    constructor(private planillaGastosMensualesService: PlanillaGastosMensualesService, private planillaGastosMensualesFactory: PlanillaGastosMensualesFactory) {
        this.PlanillaGastosMensuales = new PlanillaGastosMensuales();
        this.PagosPorConcepto = new Array<PagosAnualConcepto>();
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
         this.MostrarSpinningIcon = true;
         this.planillaGastosMensualesService.ObtenerPlanillaGastosMensuales()
         .subscribe(planilla => {
                        this.PlanillaGastosMensuales = planilla;
                        this.PagosPorConcepto = this.planillaGastosMensualesFactory.ConstruirPagosAnualConcepto(this.PlanillaGastosMensuales);
                        console.log( this.PagosPorConcepto);
                         this.MostrarSpinningIcon = false;
                    }, 
                    error => { 
                         this.MostrarSpinningIcon = false;
                        console.log(error); 
                    });                                      
        }
    }

    // *** Event handlers ***************************************************
    log(selectedTab:iTab) {
        console.log('Selected Tab with title: ' + selectedTab.TabTitle);
  }
}
 