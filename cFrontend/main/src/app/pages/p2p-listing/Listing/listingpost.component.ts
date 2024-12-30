import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { SolarData } from '../../../@core/data/solar';
import { ApiService } from '../../../service/api/api.service';
import { CommonService } from '../../../service/common/common.service';

@Component({
  selector: 'ngx-listingpost',
  templateUrl: './listingpost.component.html',
  styleUrls: ['./listingpost.component.scss']
})
export class ListingPostComponent implements OnInit {

  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  List: any = [];
  searchValue: any = '';

  public Number = Number;

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getList();
    let url = this.router.url
    this.apiService.ipCheck()
    this.apiService.checkaccess(url)
  }


  getList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10,
    };
    this.apiService.postRequest('admin/getAllList', params).subscribe((resp: any) => {
      console.log("🚀 ~ ListingPostComponent ~ this.apiService.postRequest ~ resp:", resp)
      if (resp.status) {
        this.List = resp.data;
        console.log("🚀 ~ ListingPostComponent ~ this.apiService.postRequest ~  this.List:", this.List)
        // console.log("user_details[0].email",this.List.user_details[0].email)
        this.totalItems = resp.datacount;
        this.spinnerService.hide();
      }
      else {
        this.List = [];
        this.totalItems = 0;
        this.spinnerService.hide();
      }
    })
  }

  decrypt(data: any) {
    return this.commonService.dataDecryption(data)
  }

  pageChanged(): void {
    this.getList();
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }

}
