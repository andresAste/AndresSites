/**
 * Interface for tab
 * 
 * @export
 * @interface iTab
 */
export interface iTab {
  /**
   * Título del tab
   * 
   * @type {string}
   * @memberOf iTab
   */
  TabTitle: string,
  /**
   * Indica si el tab está seleccionado
   * 
   * @type {boolean}
   * @memberOf iTab
   */
  Selected: boolean
  /**
   * clase css para el tab
   * 
   * @type {string}
   * @memberOf TabComponent
   */
  CssClass:string;
  
}