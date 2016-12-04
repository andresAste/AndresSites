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
/**
 * Componente para el manejo de tabs
 *
 * @export
 * @class TabsComponent
 */
var TabsComponent = (function () {
    function TabsComponent() {
        /// *** Properties *****************************
        /**
         * Lista de tabs.
         *
         * @type {iTab[]}
         * @memberOf TabsComponent
         */
        this.Tabs = [];
        /**
         * Evento que se dispara al seleccionarse un tab
         *
         *
         * @memberOf TabsComponent
         */
        this.Selected = new core_1.EventEmitter();
    }
    /// *** Metodos *****************************
    /**
     * Agrega un tab
     *
     * @param {iTab} tab
     *
     * @memberOf TabsComponent
     */
    TabsComponent.prototype.AddTab = function (tab) {
        if (tab.Selected === true) {
            tab.CssClass = "current";
        }
        else {
            tab.CssClass = "";
        }
        if (!this.Tabs.length) {
            tab.Selected = true;
        }
        this.Tabs.push(tab);
    };
    /**
     * Selecciona un tab
     *
     * @param {iTab} tab
     *
     * @memberOf TabsComponent
     */
    TabsComponent.prototype.SelectTab = function (tab) {
        this.Tabs.map(function (tab) {
            tab.Selected = false;
            tab.CssClass = "";
        });
        tab.Selected = true;
        tab.CssClass = "current";
        this.Selected.emit({ selectedTab: tab });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TabsComponent.prototype, "Selected", void 0);
    TabsComponent = __decorate([
        core_1.Component({
            selector: 'my-tabs',
            templateUrl: 'app/framework/tab/tabs.component.html',
            styleUrls: ['app/framework/tab/tabs.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=tabs.component.js.map