import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../service/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-checkinhistory',
  templateUrl: './checkinhistory.component.html',
  styleUrls: ['./checkinhistory.component.scss']
})
export class CheckinhistoryComponent {
  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  checkInHistory: any = [];
  token: any
  constructor(
    private apiService: ApiService, public spinnerService: NgxSpinnerService,) {
      this.token = localStorage.getItem('key') || '';
    this.getCheckInHistory();
    console.log("🚀 ~ CheckinhistoryComponent ~ this.token :", this.token )

  }

  pageChanged(): void {
    this.page = this.page;
    this.getCheckInHistory();
  }

  getCheckInHistory() {
    let params = {
      page: this.page ? this.page : this.currentPage,
      limit: 10,
      search: this.token
    };
    console.log("🚀 ~ CheckinhistoryComponent ~ getCheckInHistory ~ params:", params)
    this.apiService.postRequest('v1/auth/checkInHistory', params).subscribe((historyResponse: any) => {
      if (historyResponse.status) {
        this.checkInHistory = historyResponse.data.results;
        this.totalItems = historyResponse.data.results.totalResults;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }
  public trackByFn(index: number, item: any): number {
    return item._id;
  }
}
