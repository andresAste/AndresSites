import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { PlanillaGastosMensualesService } from './../services/planillaGastosMensuales.service';

/**
 * Modal para upload de archivos
 * 
 * @export
 * @class ArchivoUploader
 */
@Component({
    selector: 'file-upload',
    templateUrl: 'app/framework/archivoUploader.component.html', 
    providers: [ PlanillaGastosMensualesService ]
})
export class ArchivoUploader {

    /// *** Properties *************************************************
    /**
     * Base de la url a donde subir los archivos
     * 
     * @private
     * @type {string}
     * @memberOf ArchivoUploader
     */
    private BaseUrl : string;

    /**
     * Path del archivo
     * 
     * @private
     * @type {string}
     * @memberOf ArchivoUploader
     */
    private _pathArchivo: string;
    get PathArchivo() :string {
        return this._pathArchivo;
    }
    set PathArchivo(path:string) {
        this._pathArchivo = path;
        console.log("url:" +  this.BaseUrl +  path);
        this.uploader = new FileUploader({url: this.BaseUrl + path});
    } 

    /**
     * File Uploader
     * 
     * @type {FileUploader}
     * @memberOf ArchivoUploader
     */
    public uploader: FileUploader;// = new FileUploader({url: "https://evening-anchorage-3159.herokuapp.com/api/" });

    /// *** Constructor *************************************************
    /**
     * Creates an instance of ArchivoUploader.
     * 
     * @param {PlanillaGastosMensualesService} planillaService
     * @param {NgbActiveModal} activeModal
     * 
     * @memberOf ArchivoUploader
     */
    constructor(private planillaService: PlanillaGastosMensualesService, public activeModal: NgbActiveModal) {
        this.BaseUrl =  planillaService.ServicesBaseAddress + planillaService.DropBoxFileService;
    }

    /// *** Methods *************************************************

    /**
     * Remueve archivos encolados
     * @memberOf ArchivoUploader
     */
    RemoverArchivosEncolados() {
        this.uploader.queue.forEach(element => {
            element.remove();
        });
    }

}