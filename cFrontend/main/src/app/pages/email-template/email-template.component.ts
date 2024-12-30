import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {

  emailTemplateList: any = [];
  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  writeStatus: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // this.getEmailTemplateList();
    let url=this.router.url
    this.apiService.checkaccess(url)
    this.apiService.readWriteAccess(url).then((writeStatus: any) => {
      this.writeStatus = writeStatus
    })
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.getEmailTemplateList();
  }

  getEmailTemplateList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('admin/get_email_templates', params).subscribe((templateResponse: any) => {
      if (templateResponse.status) {
        this.emailTemplateList = templateResponse.data;
        this.totalItems = templateResponse.totalCount;
        this.spinnerService.hide()
      }
    })
  }

  deleteEmailTemplate(_id: any) {
    this.spinnerService.show()
    if(_id && _id != '') {
      this.apiService.postRequest('admin/delete_email_template', { id: _id }).subscribe((deleteResponse: any) => {
        if(deleteResponse.status) {
          this.toastrService.success(deleteResponse.message, 'Success');
          this.getEmailTemplateList();
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
