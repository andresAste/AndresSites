 import { Component } from '@angular/core';

@Component({
  selector: 'gastos-mensuales',
  template: `
    <h1>{{title}}</h1>
    <nav>
    	<a routerLink="/home" routerLinkActive="active">Home</a>
    	<a routerLink="/compras" routerLinkActive="active">Compras</a>
	</nav>    	
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
   title: string = 'Gastos Mensuales'; 
}