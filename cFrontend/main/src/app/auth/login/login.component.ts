import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';

// @ts-ignore
import PatternLock from 'patternlock';
import { ApiService } from '../../service/api/api.service';


declare let window: any;

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { read: NgForm, static: true }) form: any;
  patterncode: any = '';
  Email: any;
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

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    
  ) {

  }

  ngOnInit(): void {
    let keyValue = localStorage.getItem('key') || '';
    let TFAStatus = localStorage.getItem('TFAStatus') || ''
    if (keyValue && keyValue != '' && TFAStatus != '' && TFAStatus == 'Enable') {
      this.isTFA = true;
    }
  }

  getConfigValue(key: any) {
    key = 9
  }
  getminlength(val: any) {
    val = 9
  }

  checkIPAccess() {
    this.apiService.postRequest('admin/getaccdetails', {}).subscribe((ipResponse: any) => {
      if (!ipResponse.status) {
        this.toastrService.danger(ipResponse.message, 'Error !!');
        setTimeout(() => {
          this.router.navigate([`/404`]);
        }, 1000);
      }
    })
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


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  logout() {
    this.toastrService.success('IP Issue', 'Logout');
    localStorage.clear();
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);
  }


  submitLogin(form: NgForm) {
    this.onLogin = true
    if (form.valid) {
      this.onDisabled = true;
      // if (this.patterncode && this.patterncode != '') {
        let userObj = {
          email: this.Email,
          password: this.password,
          // pattern: this.patterncode
        };
        // this.spinnerService.show();
        this.apiService.postRequest('v1/admin/admin-login', userObj).subscribe((loginResponse: any) => {

          if (loginResponse.status == false) {
            this.toastrService.danger(loginResponse.message, 'Error !!');
            form.reset();
            this.resetPattern();
            this.expiryAdmin();
            this.onDisabled = false;
          } else {
            if (loginResponse.status && loginResponse.status == true) {
              localStorage.setItem("subAdminStatus", loginResponse.subAdminStatus)
              localStorage.setItem("id", loginResponse.id)
              localStorage.setItem('isLogin', 'true');

              if (loginResponse.tfaStatus == "Active") {
                this.setTokenValue(loginResponse);
                this.toastrService.success('Please enter your TFA Code', 'Success');
                this.isTFA = true;
              } else {
                this.setLocalStorage(loginResponse);
                this.toastrService.success(loginResponse.message, 'Success');

                if (localStorage.getItem('subAdminStatus') == 'false') {
                  this.router.navigate([`/pages/dashboard`]);
                }
                else if (localStorage.getItem('subAdminStatus') == 'true') {
                  
                  this.apiService.postRequest('admin/getModule', { id: localStorage.getItem('id') }).subscribe((suc: any) => {
                    const item = suc.data.modules.find((element: any) => {
                      return element.status == true
                    })
                    this.children = item.children
                    if (this.children?.length > 0) {
                      for (let i = 0; i < this.children.length; i++) {
                        if (this.children[i].status) {
                          this.url = this.children[0].link
                          this.router.navigate([`${this.url}`]);
                        }
                      }
                    }
                    else {
                      this.url = item?.link;
                      this.router.navigate([`${this.url}`]);
                    }
                  })
                }
                form.reset();
                this.resetPattern();
                this.onLogin = false
                this.onDisabled = false;
              }
            } else {
              this.toastrService.danger(loginResponse.message, 'Error !!');
              this.onDisabled = false;
            }
          }
          setTimeout(() => {
            this.spinnerService.hide();
          }, 50);
        });
      // }

      // else {
      //   this.toastrService.danger('Please fill your pattern', 'Error !!');
      //   this.onDisabled = false;
      // }
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
      this.onDisabled = false;
    }
  }


  expiryAdmin() {
    this.apiService.getRequest('admin/ipblockcheck').subscribe((suc: any) => {
      if (suc.status == false) {
        this.router.navigate(['/404']);
      }
    })
  }

  submitOTP(otpForm: NgForm) {
    this.onTFA = true
    if (otpForm.valid) {
      this.TFAdisable = true;
      this.spinnerService.show();
      let otpObj = {
        emailid: this.Email,
        token: this.otp
      };
      this.apiService.postRequest('admin/otp_verify_2fa_admin', otpObj).subscribe((otpResponse: any) => {
        if (otpResponse.status == false) {
          this.toastrService.danger(otpResponse.message, 'Error !!');
          otpForm.reset();
          this.onTFA = false
          this.TFAdisable = false;
        } else {
          if (otpResponse.status && otpResponse.status != false) {
            this.setLocalStorage(otpResponse);
            this.toastrService.success(otpResponse.message, 'Success');
            this.router.navigate([`/pages/dashboard`]);
            otpForm.reset();
            this.onTFA = false
            this.TFAdisable = false;
          } else {
            this.toastrService.danger(otpResponse.message, 'Error !!');
            this.TFAdisable = false;
          }
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

  setTokenValue(responseData: any) {
    localStorage.setItem('key', responseData.token);
    // localStorage.setItem('TFAStatus', responseData.admin_2FA);
  }

  setLocalStorage(responseData: any) {
    // localStorage.setItem('datetime', responseData.data.time);
    // localStorage.setItem('userID', responseData.userID);
    localStorage.setItem('isAdminLogin', 'true');
    localStorage.setItem('key', responseData.token);
  }

  resetPattern() {
    var lock = new PatternLock('#patternContainer', {});
    lock.reset();
    this.patterncode = '';
  }

}
