import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
    templateUrl: './alert.component.html',
    selector: 'app-alert',
    moduleId: 'AlertModal'
})

export class AlertComponent implements OnInit {

    message = '';
    @Input() AlertTitle = 'Title';
    @ViewChild('lgAlertModal') lgModalalert: any;

    constructor() {
    }

    public ngOnInit(): void {
        this.message = '';
    }

    public showAlertModal(msg: string) {
        this.message = msg;
        this.lgModalalert.show();
    }

    public HideModal() {
        this.lgModalalert.hide();
        this.lgModalalert.hide();
    }
}
