import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';
import { ConfirmationDialogService } from '../../service/Confirm/confirmation-dialog.service';

@Component({
  selector: 'ngx-cms-management',
  templateUrl: './cms-management.component.html',
  styleUrls: ['./cms-management.component.scss']
})
export class CmsManagementComponent implements OnInit {

  cmsList: any = [];
  totalItems: number;
  currentPage = 1;
  page: number = 1;
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
    // this.getCmsList();
    let url=this.router.url
    this.apiService.checkaccess(url)
    this.apiService.readWriteAccess(url).then((writeStatus: any) => {
      this.writeStatus = writeStatus
    })
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.getCmsList();
  }

  getCmsList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('admin/get_cms', params).subscribe((cmsResponse: any) => {
      if (cmsResponse.status) {
        this.cmsList = cmsResponse.data;
        this.totalItems = cmsResponse.totalCount;
        this.spinnerService.hide()
      }
    })
  }

  updateStatus(_id: any, data: any) {
    if (_id && _id != '') {
      let updateObj = {
        _id: _id,
        status: data
      };
      this.apiService.postRequest('admin/update_cms', updateObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.getCmsList();
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
          this.deleteCms(_id)
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to remove this item", 'Error');
      })
  }

  deleteCms(_id: any) {
    if (_id && _id != '') {
      this.spinnerService.show()
      this.apiService.postRequest('admin/delete_cms', { id: _id }).subscribe((deleteResponse: any) => {
        if (deleteResponse.status) {
          this.toastrService.success(deleteResponse.message, 'Success');
          this.getCmsList();
        }
        else {
          this.toastrService.danger(deleteResponse.message, 'Error !!');
        }
        this.spinnerService.hide();
      })
    }
  }

}
