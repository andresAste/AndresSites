"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var planillaGastosMensuales_service_1 = require('./services/planillaGastosMensuales.service');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var framework = require('./framework/index');
/**
 * Home component
 *
 * @export
 * @class HomeComponent
 */
var HomeComponent = (function () {
    // *** Constructor ******************************************************************************
    function HomeComponent(planillaGastosMensualesService, modalService) {
        this.planillaGastosMensualesService = planillaGastosMensualesService;
        this.modalService = modalService;
    }
    // *** Methods **********************************************************************************ç
    /**
    * implement OnInit's `ngOnInit` method
    *
    * @memberOf HomeComponent
    */
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var modalRef = this.modalService.open(framework.ProgresoModal);
        modalRef.componentInstance.Mensaje = "Buscando planillas";
        this.planillaGastosMensualesService.ObtenerPlanillasDisponibles()
            .subscribe(function (planillas) {
            _this.PlanillasDisponibles = planillas;
            modalRef.close();
        }, function (error) {
            console.log(error);
            modalRef.close();
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <div class=\"row\" *ngIf=\"PlanillasDisponibles && PlanillasDisponibles.length > 0\">\n        <div class=\"col-xs-6\">\n            <div ngbDropdown class=\"d-inline-block\">\n                A\u00F1o : \n                <button class=\"btn btn-outline-primary\" id=\"dropdownMenu1\" ngbDropdownToggle>A\u00F1os disponibles</button>\n                <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n                    <button class=\"dropdown-item\" *ngFor=\"let planilla of PlanillasDisponibles\">{{planilla.Anio}}</button>\n                </div>\n            </div>\n        </div>\n         <nav>\n    \t    <a routerLink=\"/gastos\" routerLinkActive=\"active\">Gastos</a>\n    \t    <a routerLink=\"/compras\" routerLinkActive=\"active\">Compras</a>\n \t    </nav>    \t\n        <router-outlet></router-outlet>\n    </div>\n    <template ngbModalContainer></template>\n  ",
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService]
        }), 
        __metadata('design:paramtypes', [planillaGastosMensuales_service_1.PlanillaGastosMensualesService, ng_bootstrap_1.NgbModal])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map