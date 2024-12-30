import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuardService } from '../../guard/auth-guard.service';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: any;
  token: any;
  user_id: any;
  resetObj: any = {};
  isResetPassword: Boolean = false;
  onSubmit: boolean = false
  onDisabled: Boolean = false;

  showNewPassword: boolean = true;
  showConfirmPassword: boolean = true;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private spinnerService: NgxSpinnerService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.token && this.token != '') {
      this.isResetPassword = true;
      this.verifyLink(this.token);
    }
  }

  getConfigValue(key: any) {
    key = 9
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  sendForgotPassword(forgotPasswordForm: NgForm) {
    this.onSubmit = true
    if (forgotPasswordForm.valid) {
      this.spinnerService.show()
      this.onDisabled = true;
      let forgotObj = {
        email: this.email
      };
      this.apiService.postRequest('admin/forgotpassword', forgotObj).subscribe((forgotResponse: any) => {
        if (forgotResponse.status) {
          this.toastrService.success(forgotResponse.message, 'Success');
          this.onSubmit = false;
          this.onDisabled = false;
          forgotPasswordForm.reset();
          this.router.navigate([`/auth/login`]);
        }
        else {
          this.toastrService.danger(forgotResponse.message, 'Error !!');
          this.onDisabled = false;
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

  verifyLink(token: any) {
    this.spinnerService.show()
    if (token && token != '') {
      this.apiService.postRequest('admin/resetpasswordverify', { _id: token }).subscribe((verifyResponse: any) => {
        if (verifyResponse.status) {
          this.spinnerService.hide();
          this.toastrService.success(verifyResponse.message, "Success");
          this.user_id = verifyResponse.data;
          if (this.authGuardService.LoginStatus) {
            this.router.navigate([`/pages/dashboard`]);
          }
        }
        else {
          this.toastrService.danger(verifyResponse.message, 'Error !!');
          this.spinnerService.hide();
          this.router.navigate([`/auth/forgot-password`]);
        }

      })
    }
  }

  resetPassword(resetPasswordForm: NgForm) {
    if (resetPasswordForm.valid) {
      this.spinnerService.show()
      this.onDisabled = true;
      let resetPasswordObj = {
        _id: this.user_id,
        password: this.resetObj.newPassword,
        confirmPassword: this.resetObj.confirmPassword
      };
      this.apiService.postRequest('admin/reset_password', resetPasswordObj).subscribe((resetResponse: any) => {
        if (resetResponse.status) {
          this.toastrService.success(resetResponse.message, 'Success');
          this.router.navigate([`/auth/login`]);
          this.onDisabled = false
        }
        else {
          this.toastrService.danger(resetResponse.message, 'Error !!');
          this.onDisabled = false
        }
      })
      setTimeout(() => {
        this.spinnerService.hide();
      }, 50);
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
      this.onDisabled = false

    }
  }

}
