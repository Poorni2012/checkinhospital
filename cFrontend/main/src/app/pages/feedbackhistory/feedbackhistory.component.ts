import { Component } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { ApiService } from '../../service/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-feedbackhistory',
  templateUrl: './feedbackhistory.component.html',
  styleUrls: ['./feedbackhistory.component.scss']
})
export class FeedbackhistoryComponent {
  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  feedbackList: any = [];
  searchValue: any = '';

  public Number = Number;
  truelist: any = [];

  constructor(
    private themeService: NbThemeService,
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getFeedbackList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }


  getFeedbackList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10,
    };
    this.truelist = []
    this.apiService.postRequest('admin/getFeedbacks', params).subscribe((feedbackResponse: any) => {
      if (feedbackResponse.status) {
        this.feedbackList = feedbackResponse.data;
        for (let i = 0; i < this.feedbackList.length; i++) {
          if (this.feedbackList[i].feedback == true) {
            this.truelist.push(this.feedbackList[i])
          }
        }
        this.totalItems = feedbackResponse.count;
        this.spinnerService.hide();
      }
      else {
        this.feedbackList = [];
        this.totalItems = 0;
        this.spinnerService.hide();
      }
    })
  }


  pageChanged(): void {
    this.getFeedbackList();
  }


}
