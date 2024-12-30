import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() isInput: boolean = false;

  reason: any = '';
  showText: any;
  onSubmit: boolean = false;

  constructor(private activeModal: NgbActiveModal, private toastrService: NbToastrService) { }

  ngOnInit() {
    console.log(this.isInput);
    if(this.isInput) {
      let isCheck = this.title.includes('OTP');
      if(isCheck) {
        this.showText = 'OTP';
      }
      else {
        this.showText = 'Reason';
      }
    }
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    if (this.isInput) {
      this.onSubmit = true;
      if (this.reason && this.reason != '') {
        this.activeModal.close(this.reason);
      }
      else {
        this.toastrService.danger('Please fill the reason', 'Error !!');
      }
    }
    else {
      this.activeModal.close(true);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }


}
