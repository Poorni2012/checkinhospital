import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { SolarData } from '../../../@core/data/solar';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-list-kycdetails',
  templateUrl: './list-kycdetails.component.html',
  styleUrls: ['./list-kycdetails.component.scss']
})
export class ListKycdetailsComponent implements OnInit {

  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  userList: any = [];
  length: any;


  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getkycList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()

  }



  getkycList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };

    this.apiService.postRequest('admin/users_kyc_list', params).subscribe((userListResponse: any) => {
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


  pageChanged(): void {
    this.getkycList();
  }

}
