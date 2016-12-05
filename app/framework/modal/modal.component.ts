import { Component } from '@angular/core';    

/**
 * Component Modal
 * 
 * @export
 * @class ModalComponent
 */
@Component({
  selector: 'app-modal',
  templateUrl: 'app/framework/modal/modal.component.html',
  styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ModalComponent {
   // ---- Properties -----------------------------------------------------------------
  public visible = false;
  private visibleAnimate = false;

  // --- Methods -----------------------------------------------------------------------
  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}