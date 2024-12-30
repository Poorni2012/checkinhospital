import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';

// @ts-ignore
import PatternLock from 'patternlock';
import { AuthGuardService } from '../../guard/auth-guard.service';
import { ApiService } from '../../service/api/api.service';

declare let window: any;

@Component({
  selector: 'ngx-forgot-pattern',
  templateUrl: './forgot-pattern.component.html',
  styleUrls: ['./forgot-pattern.component.scss']
})
export class ForgotPatternComponent implements OnInit {

  Email: any;
  onSubmit: boolean = false;
  newPatternCode: any = '';
  confirmPatternCode: any = '';
  isResetPattern: Boolean = false;
  token: any;
  user_id: any;
  onDisabled: boolean = false;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private spinnerService: NgxSpinnerService,
    private authGuardService: AuthGuardService
  ) { }

  getConfigValue(key: any) {
    key = 9
  }
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.token && this.token != '') {
      this.isResetPattern = true;
      this.verifyLink(this.token);
    }
  }

  ngAfterViewInit() {
    var that = this;
    var newLock = new PatternLock('#newPatternContainer', {
      onDraw: function (patterncode: any) {
        var pat = newLock.getPattern();
        that.newPatternCode = pat;
        if (that.newPatternCode.length <= 2) {
          that.toastrService.danger('Your pattern is too short', 'Error !!');
          newLock.reset();
        }
        else {
          that.newPatternCode = pat;
          window.newPatternCode = that.newPatternCode;
        }
      },
    });

    var confirmLock = new PatternLock('#confirmPatternContainer', {
      onDraw: function (patterncode: any) {
        var pat = confirmLock.getPattern();
        that.confirmPatternCode = pat;
        if (that.confirmPatternCode.length <= 2) {
          that.toastrService.danger('Your pattern is too short', 'Error !!');
          confirmLock.reset();
        }
        else if (that.newPatternCode == '') {
          that.toastrService.danger('Fill the new pattern field', 'Error !!');
          confirmLock.reset();
          that.confirmPatternCode = '';
        }
        else if (that.newPatternCode != that.confirmPatternCode) {
          that.toastrService.danger('Pattern does not match the confirm pattern', 'Error !!');
          confirmLock.reset();
          that.confirmPatternCode = '';
        }
        else {
          that.confirmPatternCode = pat;
          window.confirmPatternCode = that.confirmPatternCode;
        }
      },
    });
  }

  sendForgotPattern(forgotPatternForm: NgForm) {
    this.onSubmit = true;
    if (forgotPatternForm.valid) {
      this.spinnerService.show()

      this.onDisabled = true;
      let forgotObj = {
        email: this.Email
      };
      this.apiService.postRequest('v1/admin/admin-forgetpattern', forgotObj).subscribe((forgotResponse: any) => {
        if (forgotResponse.status) {
          this.toastrService.success(forgotResponse.message, 'Success');
          forgotPatternForm.reset();
          this.onDisabled = false;
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
      this.onDisabled = false;
    }
  }

  verifyLink(token: any) {
    this.spinnerService.show()
    if (token && token != '') {
      this.apiService.postRequest('admin/resetpatternverify', { _id: token }).subscribe((verifyResponse: any) => {
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
          this.router.navigate([`/auth/forgot-pattern`]);
        }
      })
    }
  }


  resetPattern(resetPatternForm: NgForm) {
    if (resetPatternForm.valid && this.newPatternCode && this.confirmPatternCode) {
      this.onDisabled = true;
      this.spinnerService.show()

      let resetPatternObj = {
        _id: this.user_id,
        pattern: this.newPatternCode,
        confirmPattern: this.confirmPatternCode
      };
      this.apiService.postRequest('admin/reset_pattern', resetPatternObj).subscribe((resetResponse: any) => {
        if (resetResponse.status) {
          this.toastrService.success(resetResponse.message, 'Success');
          this.resetDrawPattern();
          this.router.navigate([`/auth/login`]);
          this.onDisabled = false;
        }
        else {
          this.resetDrawPattern();
          this.toastrService.danger(resetResponse.message, 'Error !!');
          this.onDisabled = false;
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required pattern fields', 'Error !!');
    }
  }

  resetDrawPattern() {
    var newLock = new PatternLock('#newPatternContainer', {});
    var confirmLock = new PatternLock('#confirmPatternContainer', {});
    newLock.reset();
    confirmLock.reset();
    this.newPatternCode = '';
    this.confirmPatternCode = '';
  }

}
