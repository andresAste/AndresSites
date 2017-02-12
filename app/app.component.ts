 import { Component } from '@angular/core';
 
@Component({
  selector: 'gastos-mensuales',
  template: `
    <h1>{{title}}</h1>
    <nav>
    	<a routerLink="/gastos" routerLinkActive="active">Gastos</a>
    	<a routerLink="/compras" routerLinkActive="active">Compras</a>
 	  </nav>    	
    <router-outlet></router-outlet>
    <template ngbModalContainer></template>
  `
})
export class AppComponent {
   title: string = 'Gastos Mensuales'; 
}