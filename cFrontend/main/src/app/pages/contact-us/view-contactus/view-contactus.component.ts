import { Component, OnInit } from '@angular/core';
import {  NbToastrService } from '@nebular/theme';

import { ApiService } from '../../../service/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-view-contactus',
  templateUrl: './view-contactus.component.html',
  styleUrls: ['./view-contactus.component.scss']
})
export class ViewContactusComponent implements OnInit {
  userData: any;
  onSubmit: boolean
  currentId: any;
  userObj: any = {};

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public confirmationDialogService: ConfirmationDialogService,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.viewContactUsDetails()
    }
    this.apiService.ipCheck()
  }


  viewContactUsDetails() {
    this.spinnerService.show();
    let params = {
      _id: this.currentId
    }
    this.apiService.postRequest('admin/getOnecontactus', params).subscribe((singleUserResponse: any) => {
      if (singleUserResponse.status) {
        this.userObj = singleUserResponse.data;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

  adminReply() {
    if (this.userObj.admin_reply && this.userObj.admin_reply != '') {
      this.spinnerService.show();
      let params = {
        _id: this.currentId,
        admin_reply: this.userObj.admin_reply
      }
      this.apiService.postRequest('admin/adminreplycontact', params).subscribe((adminReplyResponse: any) => {
        if (adminReplyResponse.status) {
          this.userObj = adminReplyResponse.data;
          this.spinnerService.hide();
          this.toastrService.success(adminReplyResponse.message, 'Success');
          this.router.navigate(['/pages/contactus'])
        }
        else {
          this.spinnerService.hide();
          this.toastrService.danger(adminReplyResponse.message, 'Error');
        }
      })
    }
    else {
      this.toastrService.danger('Please enter the reply message', 'Error');
    }
  }
}
