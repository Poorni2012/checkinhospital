import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-list-supportticket',
  templateUrl: './list-supportticket.component.html',
  styleUrls: ['./list-supportticket.component.scss']
})
export class ListSupportticketComponent implements OnInit {

  suppportTicketList: any = [];
  totalItems: number;
  totalData: number;

  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  private alive = true;

  solarValue: number;
  writeStatus: boolean;
  constructor(
  
    private apiService: ApiService,
    public router: Router,
    public spinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.getSupportTicketList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    if(url){
      this.apiService.readWriteAccess(url).then((writeStatus: any) => {
        this.writeStatus = writeStatus
      })
    }
    this.apiService.ipCheck()
   }

  pageChanged(): void {
    this.getSupportTicketList();
  }

  getSupportTicketList() {
    this.spinnerService.show()
    let params = {
      start: this.page ? this.page : this.currentPage,
      length: 10,

    };
    this.apiService.postRequest('admin/get_allsupporttickets', params).subscribe((supportTicketResponse: any) => {
      if (supportTicketResponse.status) {
        this.suppportTicketList = supportTicketResponse.data;
        this.totalItems = supportTicketResponse.datacount;
        this.spinnerService.hide()
      }
    })
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }

}
