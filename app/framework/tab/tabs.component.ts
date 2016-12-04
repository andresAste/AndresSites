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
  templateUrl: 'app/framework/tab/tabs.component.html',
  styleUrls: ['app/framework/tab/tabs.css']
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
    if (tab.Selected === true) {
      tab.CssClass = "current";
    } else {
      tab.CssClass = "";
    }

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
      tab.CssClass = "";
    })
    tab.Selected = true;
    tab.CssClass = "current";
    this.Selected.emit({selectedTab: tab});    
  }
}