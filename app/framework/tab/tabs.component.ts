import { Component, EventEmitter, Output } from '@angular/core';
import { iTab } from './iTab.interface';

/**
 * Componente para el manejo de tabs
 * 
 * @export
 * @class TabsComponent
 */
@Component({
  selector: 'my-tabs',
  templateUrl: 'app/framework/tab/tabs.component.html'
})
export class TabsComponent {
  /// *** Properties *****************************
  /**
   * Lista de tabs.
   * 
   * @type {iTab[]}
   * @memberOf TabsComponent
   */
  Tabs:iTab[] = [];
  
  /**
   * Evento que se dispara al seleccionarse un tab
   * 
   * 
   * @memberOf TabsComponent
   */
  @Output() Selected = new EventEmitter();
  
  /// *** Metodos *****************************
  /**
   * Agrega un tab
   * 
   * @param {iTab} tab
   * 
   * @memberOf TabsComponent
   */
  AddTab(tab:iTab) {
    if (!this.Tabs.length) {
      tab.Selected = true;
    }
    this.Tabs.push(tab);
  }
  
  /**
   * Selecciona un tab
   * 
   * @param {iTab} tab
   * 
   * @memberOf TabsComponent
   */
  SelectTab(tab:iTab) {
    this.Tabs.map((tab) => {
      tab.Selected = false;
    })
    tab.Selected = true;
    this.Selected.emit({selectedTab: tab});    
  }
}