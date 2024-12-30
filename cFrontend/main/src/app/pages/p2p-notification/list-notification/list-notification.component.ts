import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { SolarData } from '../../../@core/data/solar';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit {

  loginHistoryList: any = [];
  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  userList: any = [];
  length: any;
  totalCount: any;
  list: any;

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.modifyNotificationCount()
    this.notificationList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.notificationList();
  }

  getNotificationCount() {
    this.spinnerService.show()
    this.apiService.getRequest('adminpage/getAdminNotificationCount').subscribe((notificationResponse: any) => {
      if (notificationResponse.status == 200) {
        this.totalCount = notificationResponse.count;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }


  modifyNotificationCount() {
    this.spinnerService.show()
    this.apiService.getRequest('adminpage/updateAdminNotification').subscribe((notificationResponse: any) => {
      if (notificationResponse.status == 200) {
        this.getNotificationCount()
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }


  notificationList() {
    this.spinnerService.show()
    let params = {
      start: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('adminpage/getAdminNotification', params).subscribe((userListResponse: any) => {
      if (userListResponse.draw == 1) {
        this.userList = userListResponse.data
        this.length = this.userList.length
        this.totalItems = userListResponse.recordsTotal;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

}
