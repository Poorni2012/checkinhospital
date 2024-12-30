import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {


  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    isInput?: boolean,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg'|'modal-body' = 'modal-body'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize, backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.isInput = isInput;

    return modalRef.result;
  }
}
