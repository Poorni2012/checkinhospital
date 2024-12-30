import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-list-transfer-history',
  templateUrl: './list-transfer-history.component.html',
  styleUrls: ['./list-transfer-history.component.scss']
})
export class ListTransferHistoryComponent implements OnInit {

  public Number = Number;
  transferList: any = [];
  config: any = {
    page: 1,
    pageSize: 10,
    totalItems: 0
  };

  constructor(
    private apiService: ApiService,
    public router: Router,
    public spinnerService: NgxSpinnerService
  ) { }


  ngOnInit(): void {
    this.getDepositList();
    let url=this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  getDepositList() {
    this.spinnerService.show()
    let transferParams = {
      page: this.config.page,
      length: 10,
    };
    this.apiService.postRequest('users/allUserInternalHistory', transferParams).subscribe((transferResponse: any) => {
      if (transferResponse.status) {
        this.transferList = transferResponse.data;
        this.config.totalItems = transferResponse.datacount;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }


  pageChanged(): void {
    this.getDepositList();
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }
}
