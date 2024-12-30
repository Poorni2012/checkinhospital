import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-subadmin',
  templateUrl: './subadmin.component.html',
  styleUrls: ['./subadmin.component.scss']
})
export class SubadminComponent implements OnInit {


  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  subAdminList: any = [];
  writeStatus: boolean;
  deleID: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.getsubAdminList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.readWriteAccess(url).then((writeStatus: any) => {
      this.writeStatus = writeStatus
    })
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.getsubAdminList();
  }

  getsubAdminList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('admin/subAdminlist', params).subscribe((subResponse: any) => {
      if (subResponse.status) {
        this.subAdminList = subResponse.data;
        this.totalItems = subResponse.totalCount;
        this.spinnerService.hide()
      }
    })
  }

  openWithoutBackdropClick(dialog: TemplateRef<any>, id: any) {
    this.dialogService.open(
      dialog,
      {
        context: 'Are you sure want to delete?',
        closeOnBackdropClick: false,
      });
    this.deleID = id
  }

  deleteSubadmin() {
    if (this.deleID && this.deleID != '') {
    this.spinnerService.show()
    this.apiService.postRequest('admin/deleteSubadmin', { id: this.deleID }).subscribe((deleteResponse: any) => {
      if (deleteResponse.status) {
        this.toastrService.success(deleteResponse.message, 'Success');
        this.getsubAdminList();
      }
      else {
        this.toastrService.danger(deleteResponse.message, 'Error !!');
      }
      this.spinnerService.hide();
    })
    }
  }


}