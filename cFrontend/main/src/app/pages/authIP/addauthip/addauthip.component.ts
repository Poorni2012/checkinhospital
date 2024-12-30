import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
// @ts-ignore
import PatternLock from 'patternlock';
import { ApiService } from '../../../service/api/api.service';

declare let window: any;

@Component({
  selector: 'ngx-addauthip',
  templateUrl: './addauthip.component.html',
  styleUrls: ['./addauthip.component.scss']
})
export class AddauthIpComponent implements OnInit {
  ipAddress: any
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.apiService.ipCheck()
  }

  submitLogin(cmsAddForm: NgForm) {
    this.spinnerService.show()
    let params = {
      type: 'add',
      ip: this.ipAddress
    }
    console.log("🚀 ~ AddauthIpComponent ~ submitLogin ~ params:", params)
    this.apiService.postRequest('admin/ip-add-remove', params).subscribe((register: any) => {
      console.log("🚀 ~ AddauthIpComponent ~ this.apiService.postRequest ~ register:", register)
      if (register.status) {
        this.toastrService.success(register.message, 'Success');
        this.router.navigate(['/pages/authip'])
      }
      else
        this.toastrService.danger(register.message, 'Error !!');
    })
    this.spinnerService.hide()

  }



  preventNonNumericalDotInputmin(evt: any) {
    if ((evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) && evt.which != 46) {
      evt.preventDefault();
    }
  }

}
