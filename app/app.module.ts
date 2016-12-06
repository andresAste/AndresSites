import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DeudasMesComponent } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';
import { ComprasComponent } from './compras.component';
import { EditarPagoComponent } from './editarPago.component';
import { TabsComponent, TabComponent, ModalComponent } from './framework/index';

import * as spinner from 'ng2-spin-kit-new/app/spinners';

/**
 * @export
 * @class AppModule Main Module, this defines an Angular application formed by Components.
 */
@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule,
  RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'compras', component: ComprasComponent },
      { path: '', component: HomeComponent }
    ]) ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  declarations: [ AppComponent, HomeComponent, DeudasMesComponent, CalendarioComponent, ComprasComponent, EditarPagoComponent,
                 TabsComponent, TabComponent, ModalComponent,
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
  bootstrap: [ AppComponent ]
})
export class AppModule { } 