import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';
import { ConfirmationDialogService } from '../../service/Confirm/confirmation-dialog.service';

@Component({
  selector: 'ngx-faq-management',
  templateUrl: './faq-management.component.html',
  styleUrls: ['./faq-management.component.scss']
})
export class FaqManagementComponent implements OnInit {

  totalItems: number;
  currentPage = 1;
  page: number = 1;
  faqList: any;
  pageSize: any = 10;
  writeStatus: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    public confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getFaqList();
    let url=this.router.url
    this.apiService.checkaccess(url)
    this.apiService.readWriteAccess(url).then((writeStatus: any) => {
      this.writeStatus = writeStatus
    })
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.getFaqList();
  }

  getFaqList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('admin/listfaq', params).subscribe((faqResponse: any) => {
      if (faqResponse.status) {
        this.faqList = faqResponse.data;
        this.faqList.map((item: any) => {
          item.toggleStatus = item.status == 'Active' ? true : false;
        })
        this.totalItems = faqResponse.totalCount;
        this.spinnerService.hide()
      }
    })
  }

  updateStatus(_id: any, data: any) {
    if (_id && _id != '') {
      let updateObj = {
        _id: _id,
        status: data == true ? 'Active' : 'InActive'
      };
      this.apiService.postRequest('admin/updateFaq', updateObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.getFaqList();
        }
        else {
          this.toastrService.danger(updateResponse.message, 'Error');
        }
      })
    }
  }

  public openConfirmationDialog(_id: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to delete this record?")
      .then(confirmed => {
        if (confirmed) {
          this.deleteFaq(_id)
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to remove this item", 'Error');
      })
  }


  deleteFaq(_id: any) {
    if (_id && _id != '') {
      this.spinnerService.show()
      this.apiService.postRequest('admin/deleteFaq', { id: _id }).subscribe((deleteResponse: any) => {
        if (deleteResponse.status) {
          this.toastrService.success(deleteResponse.message, 'Success');
          this.getFaqList();
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
