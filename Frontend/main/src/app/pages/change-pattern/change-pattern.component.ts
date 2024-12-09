import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from '../../service/api/api.service';

// @ts-ignore
import PatternLock from 'patternlock';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

declare let window: any;
@Component({
  selector: 'ngx-change-pattern',
  templateUrl: './change-pattern.component.html',
  styleUrls: ['./change-pattern.component.scss']
})
export class ChangePatternComponent implements OnInit {

  oldPatternCode: any = '';
  newPatternCode: any = '';
  confirmPatternCode: any = '';
  token: any
  constructor(
    private apiService: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) {
    this.token = localStorage.getItem('key') || '';

  }

  ngOnInit(): void {
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  ngAfterViewInit() {
    var that = this;
    var oldLock = new PatternLock('#oldPatternContainer', {
      onDraw: function (patterncode: any) {
        var pat = oldLock.getPattern();
        that.oldPatternCode = pat;
        if (that.oldPatternCode.length <= 2) {
          that.toastrService.danger('Your pattern is too short', 'Error !!');
          oldLock.reset();
        }
        else {
          that.oldPatternCode = pat;
          window.oldPatternCode = that.oldPatternCode;
        }
      },
    });

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

  changePattern(changePatternForm: NgForm) {
    if (changePatternForm.valid && this.newPatternCode && this.oldPatternCode && this.confirmPatternCode) {
      this.spinnerService.show()
      let changePatternParams = {
        token:this.token,
        pattern: this.oldPatternCode,
        newPattern: this.newPatternCode,
        confirmPattern: this.confirmPatternCode
      };
      this.apiService.postRequest('v1/auth/changepattern', changePatternParams).subscribe((patternResponse: any) => {
        if (patternResponse.status) {
          this.toastrService.success(patternResponse.message, 'Success');
          this.logout()
          this.resetDrawPattern();
        }
        else {
          this.toastrService.danger(patternResponse.message, 'Error !!');
          this.resetDrawPattern();
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }

  resetDrawPattern() {
    var oldLock = new PatternLock('#oldPatternContainer', {});
    var newLock = new PatternLock('#newPatternContainer', {});
    var confirmLock = new PatternLock('#confirmPatternContainer', {});
    oldLock.reset();
    newLock.reset();
    confirmLock.reset();
    this.oldPatternCode = '';
    this.newPatternCode = '';
    this.confirmPatternCode = '';
  }



  logout() {
    localStorage.clear();
    this.toastrService.success('Logout Successfully', 'Logout');
    setTimeout(() => {
      window.location.href = '/auth/login';
      // this.router.navigate([`/auth/login`]);
    }, 1000);
  }


}
