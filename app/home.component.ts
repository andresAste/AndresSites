 import { Component, OnInit } from '@angular/core';
 
 import { PlanillaGastosMensualesService } from './services/planillaGastosMensuales.service';
 import { Planilla } from './model/index';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import * as framework from './framework/index';
/**
 * Home component
 * 
 * @export
 * @class HomeComponent
 */
@Component({
  selector: 'home',
  template: `
    <div class="row" *ngIf="PlanillasDisponibles && PlanillasDisponibles.length > 0">
        <div class="col-xs-6">
            <div ngbDropdown class="d-inline-block">
                Año : 
                <button class="btn btn-outline-primary" id="dropdownMenu1" ngbDropdownToggle>Años disponibles</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <button class="dropdown-item" *ngFor="let planilla of PlanillasDisponibles">{{planilla.Anio}}</button>
                </div>
            </div>
        </div>
         <nav>
    	    <a routerLink="/gastos" routerLinkActive="active">Gastos</a>
    	    <a routerLink="/compras" routerLinkActive="active">Compras</a>
 	    </nav>    	
        <router-outlet></router-outlet>
    </div>
    <template ngbModalContainer></template>
  `,
  providers: [ PlanillaGastosMensualesService ]
})
export class HomeComponent {
    // *** Properties ******************************************************************************
    PlanillasDisponibles: Planilla[];

    // *** Constructor ******************************************************************************
    constructor(private planillaGastosMensualesService: PlanillaGastosMensualesService, 
                private modalService: NgbModal) {
    }

    // *** Methods **********************************************************************************ç
     /**
     * implement OnInit's `ngOnInit` method
     * 
     * @memberOf HomeComponent
     */
    ngOnInit(): void {
        const modalRef = this.modalService.open(framework.ProgresoModal);
        modalRef.componentInstance.Mensaje = "Buscando planillas";
        this.planillaGastosMensualesService.ObtenerPlanillasDisponibles()
         .subscribe(planillas => { 
                        this.PlanillasDisponibles = planillas;
                        modalRef.close();
                    }, 
                    error => { 
                        console.log(error); 
                        modalRef.close(); 
                    });                                      
        }
}