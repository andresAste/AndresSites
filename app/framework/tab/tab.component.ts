import { Component, Input, OnInit } from '@angular/core';
import { iTab } from './iTab.interface';
import { TabsComponent } from './tabs.component';

/**
 * Clase que representa un tab
 * 
 * @export
 * @class TabComponent
 * @implements {OnInit}
 * @implements {iTab}
 */
@Component({
  selector: 'my-tab',
  templateUrl: 'app/framework/tab/tab.component.html'
})
export class TabComponent implements OnInit, iTab {
  /// **** Propiedades *****************************************************
  /**
   * Indica si el tab está seleccionado
   * 
   * @type {boolean}
   * @memberOf TabComponent
   */
  Selected:boolean;
  
  /**
   *  Título del tab
   * 
   * @memberOf TabComponent
   */
  @Input() TabTitle;
  
  /// **** Constructor *****************************************************
  /**
   * Creates an instance of TabComponent
   * 
   * @param {TabsComponent} tabsComponent Componente padre que contiene todos los tabs
   * 
   * @memberOf TabComponent
   */
  constructor(private tabsComponent: TabsComponent) {}
  
  /// **** Métodos *****************************************************
  ngOnInit() {
    this.tabsComponent.AddTab(this);
  }
}