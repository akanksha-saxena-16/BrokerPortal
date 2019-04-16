import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
    templateUrl: './confirmation.component.html',
    selector: 'app-confirmation',
})

export class ConfirmationComponent implements OnInit {
    message = '';
    @ViewChild('lgConfirmationModal') lgConfirmationModal: any;
    tempFuncStorage: Function;

    constructor() {
    }
    public ngOnInit(): void {
        this.message = '';
    }
    public showAlertModal(msg: string, tempFuncStorage: Function) {
        this.message = msg;
        this.lgConfirmationModal.show();
        this.tempFuncStorage = tempFuncStorage;
    }
    public HideModal() {
        this.lgConfirmationModal.hide();
    }

    public okAction(): void {
        this.lgConfirmationModal.hide();
        this.tempFuncStorage();
    }
}
