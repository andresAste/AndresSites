import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DeudasMesComponent } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';
import { ComprasComponent } from './compras.component';

/**
 * @export
 * @class AppModule Main Module, this defines an Angular application formed by Components.
 */
@NgModule({
  imports: [ BrowserModule,
  RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'compras', component: ComprasComponent },
      { path: '', component: HomeComponent }
    ]) ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  declarations: [ AppComponent, HomeComponent, DeudasMesComponent, CalendarioComponent, ComprasComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { } 