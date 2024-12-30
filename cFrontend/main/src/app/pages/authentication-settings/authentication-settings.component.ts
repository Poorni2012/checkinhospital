import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-authentication-settings',
  templateUrl: './authentication-settings.component.html',
  styleUrls: ['./authentication-settings.component.scss']
})
export class AuthenticationSettingsComponent implements OnInit {

  tfaSettingDetails: any = {};
  updateTfaObj: any = {};
  onSubmit: boolean = false
  typeSelected: string;
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) {
  }


  ngOnInit(): void {
    this.getTFADetails();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  getTFADetails() {
    this.spinnerService.show()
    this.onSubmit = true

    this.apiService.postRequest('admin/AdminTfaView', {}).subscribe((tfaResponse: any) => {
      if (tfaResponse.status) {
        this.tfaSettingDetails = tfaResponse.data;
        this.onSubmit = false
        this.spinnerService.hide();
      }

      else {
        this.toastrService.danger(tfaResponse.message, 'Error !!');
        this.spinnerService.hide();
      }

    })
  }



  logout() {
    localStorage.clear();
    this.toastrService.success('Logout Successfully', 'Logout');
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);
  }


  enableTFADetails(tfaEnableForm: NgForm) {
    this.onSubmit = true
    if (tfaEnableForm.valid) {
      this.spinnerService.show();
      var enableParams = {
        tfa_code: this.updateTfaObj.tfa_code,
      };
      this.apiService.postRequest('admin/Admin_set_enable_2fa', enableParams).subscribe((tfaEnableResponse: any) => {
        if (tfaEnableResponse.status) {
          this.toastrService.success(tfaEnableResponse.message, 'Success');
          tfaEnableForm.reset();
          this.getTFADetails();
          this.onSubmit = false
          this.logout()
        }
        else {
          this.toastrService.danger(tfaEnableResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      });
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }

  disableTFADetails(tfaDisableForm: NgForm) {
    this.onSubmit = true
    this.spinnerService.show();

    if (tfaDisableForm.valid) {
      var disableParams = {
        token: this.updateTfaObj.tfa_code,
      };
      this.apiService.postRequest('admin/disable_Admin_tfa', disableParams).subscribe((tfaEnableResponse: any) => {
        if (tfaEnableResponse.status) {
          this.toastrService.success(tfaEnableResponse.message, 'Success');
          tfaDisableForm.reset();
          this.getTFADetails();
          this.onSubmit = false
        }
        else {
          this.toastrService.danger(tfaEnableResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      });
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }

}
