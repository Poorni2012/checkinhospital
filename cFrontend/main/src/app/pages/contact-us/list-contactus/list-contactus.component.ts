import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-list-contactus',
  templateUrl: './list-contactus.component.html',
  styleUrls: ['./list-contactus.component.scss']
})
export class ListContactusComponent implements OnInit {
  writeStatus: any;

  constructor(
   
    private apiService: ApiService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) { }

  contactUsList: any = [];
  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;

  ngOnInit(): void {
    this.getContactUsList()
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.readWriteAccess(url).then((writeStatus: any) => {
      this.writeStatus = writeStatus
    })
    this.apiService.ipCheck()
  }


  pageChanged(): void {
    this.page = this.page;
    this.getContactUsList();
  }

  getContactUsList() {
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.spinner.show();
    this.apiService.postRequest('admin/getcontactus', params).subscribe((contactusResponse: any) => {
      if (contactusResponse.status) {
        this.contactUsList = contactusResponse.data;
        this.totalItems = contactusResponse.totalItems;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
}
