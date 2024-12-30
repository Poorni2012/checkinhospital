import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';
import { ConfirmationDialogService } from '../../service/Confirm/confirmation-dialog.service';

@Component({
  selector: 'ngx-home-mainhome',
  templateUrl: './mainhome-banner.component.html',
  styleUrls: ['./mainhome-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  getBannerTwoLists: any = [];
  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;

  constructor(private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
    public confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getBannerTwoList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.getBannerTwoList();
  }

  getBannerTwoList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('admin/listBanner', params).subscribe((bannertwoResponse: any) => {
      if (bannertwoResponse.status) {
        this.getBannerTwoLists = bannertwoResponse.data;
        this.totalItems = bannertwoResponse.totalData;
        this.spinnerService.hide()
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

  public openConfirmationDialog(_id: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to delete this record?")
      .then(confirmed => {
        if (confirmed) {
          this.deleteBannerTwo(_id)
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to remove this item", 'Error');
      })
  }

  deleteBannerTwo(_id: any) {
    if (_id && _id != '') {
      this.spinnerService.show()
      this.apiService.postRequest('admin/deleteBanner', { id: _id }).subscribe((deleteResponse: any) => {
        if (deleteResponse.status) {
          this.toastrService.success(deleteResponse.message, 'Success');
          this.getBannerTwoList();
        }
        else {
          this.toastrService.danger(deleteResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
  }
}
