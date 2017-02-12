import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GastosComponent } from './gastos.component';
import { DeudasMesComponent } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';
import { ComprasComponent } from './compras.component';
import { EditarPagoComponent } from './editarPago.component';
import { HomeComponent } from './home.component';

import * as framework from './framework/index';
import * as spinner from 'ng2-spin-kit-new/app/spinners';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

/**
 * @export
 * @class AppModule Main Module, this defines an Angular application formed by Components.
 */
@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, NgbModule.forRoot(),
  RouterModule.forRoot([
      { path: 'gastos', component: GastosComponent },
      { path: 'compras', component: ComprasComponent },
      { path: '', component: GastosComponent }
    ]) ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  declarations: [ AppComponent, GastosComponent, DeudasMesComponent, CalendarioComponent, ComprasComponent, EditarPagoComponent, HomeComponent,
                framework.ProgresoModal, framework.ArchivoUploader,
                FileSelectDirective,
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
  entryComponents: [EditarPagoComponent, framework.ProgresoModal, framework.ArchivoUploader],       //Needed as this a modal         
  bootstrap: [ AppComponent ],
})
export class AppModule { } 