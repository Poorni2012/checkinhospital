import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  show: boolean = false
  changeObj: any = {}
  onSubmit: boolean = false;
  onDisabled: boolean = false
  password: any
  oldshow: boolean;
  confirmshow: boolean;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  toggleShowPassword() {
    this.oldshow = !this.oldshow;
  }

  toggleNewPassword() {
    this.show = !this.show
  }
  toggleConfirmPassword() {
    this.confirmshow = !this.confirmshow

  }


  logout() {
    localStorage.clear();
    this.toastrService.success('Logout Successfully', 'Logout');
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);
  }

  changePassword(changePasswordForm: NgForm) {
    this.onSubmit = true
    if (changePasswordForm.valid) {
      this.spinnerService.show()
      this.apiService.postRequest('admin/changepassword', this.changeObj).subscribe((passwordResponse: any) => {
        if (passwordResponse.status) {
          this.onDisabled = true
          this.toastrService.success(passwordResponse.message, 'Success');
          changePasswordForm.reset();
          this.onSubmit = false
          this.onDisabled = false
          this.logout()
        }
        else {
          this.toastrService.danger(passwordResponse.message, "Error !!");
          this.onDisabled = false
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
      this.onDisabled = false
    }
  }

}

