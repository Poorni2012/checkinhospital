import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import PatternLock from 'patternlock';
import { ApiService } from '../../service/api/api.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
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
  constructor(private apiService: ApiService,private toastrService:NbToastrService,    public router: Router,
    ) { }
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

  submitLogin(form: NgForm) {

    if (form.valid) {
      let userObj = {
        name: this.Name,
        email: this.Email,
        password: this.password,
        pattern: this.patterncode
      };
      this.apiService.postRequest('v1/auth/register', userObj).subscribe((loginResponse: any) => {
        if (loginResponse.status == false) {
          this.toastrService.danger(loginResponse.message, 'Error');

        } else {
          this.toastrService.success(loginResponse.message, 'Success');
          this.router.navigate([`/auth/login`]);


        }

      })
      console.log("🚀 ~ RegisterComponent ~ submitLogin ~ userObj:", userObj)
    } else {
      console.log("Required")
    }

  }
}
