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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var app_component_1 = require('./app.component');
var gastos_component_1 = require('./gastos.component');
var deudasMes_component_1 = require('./deudasMes.component');
var calendario_component_1 = require('./calendario.component');
var compras_component_1 = require('./compras.component');
var editarPago_component_1 = require('./editarPago.component');
var home_component_1 = require('./home.component');
var framework = require('./framework/index');
var spinner = require('ng2-spin-kit-new/app/spinners');
var ng2_file_upload_1 = require('ng2-file-upload');
/**
 * @export
 * @class AppModule Main Module, this defines an Angular application formed by Components.
 */
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, ng_bootstrap_1.NgbModule.forRoot(),
                router_1.RouterModule.forRoot([
                    { path: 'gastos', component: gastos_component_1.GastosComponent },
                    { path: 'compras', component: compras_component_1.ComprasComponent },
                    { path: '', component: gastos_component_1.GastosComponent }
                ])],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            declarations: [app_component_1.AppComponent, gastos_component_1.GastosComponent, deudasMes_component_1.DeudasMesComponent, calendario_component_1.CalendarioComponent, compras_component_1.ComprasComponent, editarPago_component_1.EditarPagoComponent, home_component_1.HomeComponent,
                framework.ProgresoModal, framework.ArchivoUploader,
                ng2_file_upload_1.FileSelectDirective,
                spinner.RotatingPlaneComponent,
                spinner.DoubleBounceComponent,
                spinner.WaveComponent,
                spinner.WanderingCubesComponent,
                spinner.PulseComponent,
                spinner.ChasingDotsComponent,
                spinner.CircleComponent,
                spinner.ThreeBounceComponent,
                spinner.CubeGridComponent,
                spinner.WordPressComponent,
                spinner.FadingCircleComponent,
                spinner.FoldingCubeComponent],
            entryComponents: [editarPago_component_1.EditarPagoComponent, framework.ProgresoModal, framework.ArchivoUploader],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map