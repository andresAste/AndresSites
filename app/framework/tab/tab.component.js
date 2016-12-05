"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('./../index');
/**
 * Clase que representa un tab
 *
 * @export
 * @class TabComponent
 * @implements {OnInit}
 * @implements {iTab}
 */
var TabComponent = (function () {
    /// **** Constructor *****************************************************
    /**
     * Creates an instance of TabComponent
     *
     * @param {TabsComponent} tabsComponent Componente padre que contiene todos los tabs
     *
     * @memberOf TabComponent
     */
    function TabComponent(tabsComponent) {
        this.tabsComponent = tabsComponent;
    }
    /// **** Métodos *****************************************************
    TabComponent.prototype.ngOnInit = function () {
        this.tabsComponent.AddTab(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabComponent.prototype, "Selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabComponent.prototype, "TabTitle", void 0);
    TabComponent = __decorate([
        core_1.Component({
            selector: 'my-tab',
            templateUrl: 'app/framework/tab/tab.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.TabsComponent])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=tab.component.js.map