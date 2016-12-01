import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DeudasMesComponent } from './deudasMes.component';
import { CalendarioComponent } from './calendario.component';
import { ComprasComponent } from './compras.component';
import { TabsComponent } from './framework/tab/tabs.component';
import { TabComponent } from './framework/tab/tab.component';

/**
 * @export
 * @class AppModule Main Module, this defines an Angular application formed by Components.
 */
@NgModule({
  imports: [ BrowserModule, HttpModule, 
  RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'compras', component: ComprasComponent },
      { path: '', component: HomeComponent }
    ]) ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  declarations: [ AppComponent, HomeComponent, DeudasMesComponent, CalendarioComponent, ComprasComponent, TabsComponent, TabComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { } 