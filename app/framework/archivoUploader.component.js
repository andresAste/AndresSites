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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ng2_file_upload_1 = require('ng2-file-upload');
var planillaGastosMensuales_service_1 = require('./../services/planillaGastosMensuales.service');
/**
 * Modal para upload de archivos
 *
 * @export
 * @class ArchivoUploader
 */
var ArchivoUploader = (function () {
    /// *** Constructor *************************************************
    /**
     * Creates an instance of ArchivoUploader.
     *
     * @param {PlanillaGastosMensualesService} planillaService
     * @param {NgbActiveModal} activeModal
     *
     * @memberOf ArchivoUploader
     */
    function ArchivoUploader(planillaService, activeModal) {
        this.planillaService = planillaService;
        this.activeModal = activeModal;
        this.BaseUrl = planillaService.ServicesBaseAddress + planillaService.DropBoxFileService;
    }
    Object.defineProperty(ArchivoUploader.prototype, "PathArchivo", {
        get: function () {
            return this._pathArchivo;
        },
        set: function (path) {
            this._pathArchivo = path;
            console.log("url:" + this.BaseUrl + path);
            this.uploader = new ng2_file_upload_1.FileUploader({ url: this.BaseUrl + path });
        },
        enumerable: true,
        configurable: true
    });
    /// *** Methods *************************************************
    /**
     * Remueve archivos encolados
     * @memberOf ArchivoUploader
     */
    ArchivoUploader.prototype.RemoverArchivosEncolados = function () {
        this.uploader.queue.forEach(function (element) {
            element.remove();
        });
    };
    ArchivoUploader = __decorate([
        core_1.Component({
            selector: 'file-upload',
            templateUrl: 'app/framework/archivoUploader.component.html',
            providers: [planillaGastosMensuales_service_1.PlanillaGastosMensualesService]
        }), 
        __metadata('design:paramtypes', [planillaGastosMensuales_service_1.PlanillaGastosMensualesService, ng_bootstrap_1.NgbActiveModal])
    ], ArchivoUploader);
    return ArchivoUploader;
}());
exports.ArchivoUploader = ArchivoUploader;
//# sourceMappingURL=archivoUploader.component.js.map