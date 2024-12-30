import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import PatternLock from 'patternlock';
import { ApiService } from '../../service/api/api.service';
import { NbToastrService } from '@nebular/theme';
declare let window: any;

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('form', { read: NgForm, static: true }) form: any;
  patterncode: any = '';
  Email: any;
  Name: any;
  password: any;
  confirmPassword:any;
  otp: any;
  isTFA: Boolean = false;
  onLogin: boolean = false
  onTFA: boolean
  onSubmit: boolean;
  onDisabled: Boolean = false;
  typeSelected: string;
  TFAdisable: boolean = false
  showPassword: boolean = true;
  children: any;
  url: any;
  isAdminWalletConnected: boolean;
  confirmshow: boolean = true;

  constructor(private apiService: ApiService,private toastrService:NbToastrService) { }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngAfterViewInit() {
    var that = this;
    var lock = new PatternLock('#patternContainer', {
      onDraw: function (patterncode: any) {
        var pat = lock.getPattern();
        that.patterncode = pat;
        if (that.patterncode.length <= 2) {
          alert('your pattern is too short');
          lock.reset();
          this.onDisabled = false;
        }
        else {
          that.patterncode = pat;
          window.patternCodeGet = that.patterncode;
          this.onDisabled = false;
        }
      },
    });
  }

  toggleConfirmPassword() {
    this.confirmshow = !this.confirmshow

  }

  submitLogin(form: NgForm) {

    if (form.valid) {
      let userObj = {
        name: this.Name,
        email: this.Email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      this.apiService.postRequest('v1/auth/register', userObj).subscribe((loginResponse: any) => {
        if (loginResponse.status == false) {
          this.toastrService.danger(loginResponse.message, 'Error');

        } else {
          this.toastrService.success(loginResponse.message, 'Success');

        }

      })
      console.log("🚀 ~ RegisterComponent ~ submitLogin ~ userObj:", userObj)
    } else {
      console.log("Required")
    }

  }
}
