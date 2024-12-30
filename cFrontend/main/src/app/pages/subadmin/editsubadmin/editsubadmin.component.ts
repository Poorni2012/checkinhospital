import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
// @ts-ignore
import PatternLock from 'patternlock';
import { ApiService } from '../../../service/api/api.service';
declare let window: any;

@Component({
  selector: 'ngx-editsubadmin',
  templateUrl: './editsubadmin.component.html',
  styleUrls: ['./editsubadmin.component.scss']
})
export class EditsubadminComponent implements OnInit {
  onSubmit: boolean = false;
  patterncode: any;
  list: any;
  showPassword: boolean;
  pattern: any;


  constructor(public apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService
  ) { }

  editObj: any = {};
  currentId: any;

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.editObj._id = this.currentId
    if (this.currentId && this.currentId != '') {
      this.getCurrentFaqDetails(this.currentId);
    }
    this.apiService.ipCheck()
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
        }
        else {
          that.patterncode = pat;
          window.patternCodeGet = that.patterncode;
        }
      },
    });
  }


  getCurrentFaqDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/getSubAdmin', { id: _id }).subscribe((subAdmResponse: any) => {
        if (subAdmResponse.status) {
          this.editObj = subAdmResponse.data;
          this.pattern = this.editObj.pattern
          this.list = this.editObj.modules
          this.spinnerService.hide()
        }
        else {
          this.editObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  doSomething(event: any) {

    if (event.target.checked == true) {
      this.editObj.modules = this.list
    }
    else {
      this.editObj.modules = this.list
    }
  }

  doRead(event: any) {
    if (event.target.checked == true) {
      this.editObj.modules = this.list
    }
    else {
      this.editObj.modules = this.list
    }
  }

  doWrite(event: any) {
    if (event.target.checked == true) {
      this.editObj.modules = this.list
    }
    else {
      this.editObj.modules = this.list
    }
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  editDetails(editForm: NgForm) {
    this.onSubmit = true

    if (editForm.valid) {
      this.spinnerService.show()
      this.editObj.modules = this.list
      this.editObj._id = this.currentId
      if (window.patternCodeGet != '' && window.patternCodeGet != undefined && window.patternCodeGet != 'undefined') {
        this.editObj.pattern = window.patternCodeGet
        this.editAPI()
      }
      else {
        this.editObj.pattern = this.pattern
        this.editAPI()
      }
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }

  editAPI() {
    this.apiService.postRequest('admin/updateSubAdmin', this.editObj).subscribe((updateResponse: any) => {
      if (updateResponse.status) {
        this.toastrService.success(updateResponse.message, 'Success');
        this.router.navigate(['/pages/subadmin'])
      }
      else {
        this.toastrService.danger(updateResponse.message, 'Error !!');
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 50);
    })
  }



}

