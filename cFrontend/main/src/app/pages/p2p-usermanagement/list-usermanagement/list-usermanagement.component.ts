import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { NbTabsetComponent,  NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-list-usermanagement',
  templateUrl: './list-usermanagement.component.html',
  styleUrls: ['./list-usermanagement.component.scss']
})
export class ListUsermanagementComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: NbTabsetComponent;

  loginHistoryList: any = [];
  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  userList: any = [];
  search: any = ''
  searchList: any = ''
  searchValue: any = '';
  writeStatus: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getUserList()
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.getUserList();
  }

  getUserList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10,
      search: this.searchValue
    };
    this.apiService.postRequest('admin/get_users', params).subscribe((userListResponse: any) => {
      if (userListResponse.status) {
        this.userList = userListResponse.data;
        this.totalItems = userListResponse.recordsTotal;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

  // admin/user2FAStatus
  updateUserStatus(_id: any, data: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      let updateOUserbj = {
        _id: _id,
        admin_status: data == true ? 1 : 0,
      };
      this.apiService.postRequest('admin/userAdminStatus', updateOUserbj).subscribe((updateUserResponse: any) => {
        if (updateUserResponse.status) {
          this.spinnerService.hide();
          this.toastrService.success(updateUserResponse.message, 'Success');
          this.getUserList();
        }
        else {
          this.toastrService.danger(updateUserResponse.message, 'Error');
          this.spinnerService.hide();
          this.getUserList();
        }
      })
    }
  }

  updateStatus(_id: any, data: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      let updateObj = {
        _id: _id,
        randcode: data == true ? 1 : 0,
      };
      this.apiService.postRequest('admin/user2FAStatus', updateObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.spinnerService.hide();
          this.toastrService.success(updateResponse.message, 'Success');
          this.getUserList();
        }
        else {
          this.spinnerService.hide();
          this.toastrService.danger(updateResponse.message, 'Error');
          this.getUserList();
        }
      })
    }
  }

}
