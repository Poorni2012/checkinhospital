import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NbTabsetComponent, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
import { NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ExcelServiceService } from '../../../service/excel/excel-service.service';

@Component({
  selector: 'ngx-view-usermanagement',
  templateUrl: './view-usermanagement.component.html',
  styleUrls: ['./view-usermanagement.component.scss']
})
export class ViewUsermanagementComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: NbTabsetComponent;

  onSubmit: boolean = false;
  currentId: any;
  userObj: any = {};
  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  userList: any;
  length: any;
  searchText: any = '';
  public activeTab: string;
  results: any = [];
  public Number = Number;
  depositList: any = [];
  withdrawList: any = [];
  OtcList: any = [];
  dataCount: any;
  writeStatus: any;
  userAuditList: any
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    private excelService: ExcelServiceService,
    public _sanitizer: DomSanitizer,
  ) {

    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getUsersDetails(this.currentId);
    }

  }

  ngOnInit(): void {
    this.getUserTransactionList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
    this.getAuditReport();
  }


  getUsersDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/get_one_users', { id: _id }).subscribe((userResponse: any) => {
        if (userResponse.status) {
          this.userObj = userResponse.data;
          this.userObj.randcode = this.userObj.randcode == true ? 'Enabled' : 'Disabled';
          this.userObj.email_alert = this.userObj.email_alert == true ? 'Enabled' : 'Disabled';
          this.userObj.sms_alert = this.userObj.sms_alert == true ? 'Enabled' : 'Disabled';
          this.spinnerService.hide()
        }
        else {
          this.userObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  UpdateUserEmail(userEmailForm: NgForm) {
    this.onSubmit = true;
    if (userEmailForm.valid) {
      this.spinnerService.show()
      let updateUserbj = {
        id: this.currentId,
        email: this.userObj.email,
      };
      this.apiService.postRequest('admin/update_user_email', updateUserbj).subscribe((userResponse: any) => {
        if (userResponse.status) {
          this.userObj = userResponse.data;
          this.onSubmit = true;
          this.toastrService.success(userResponse.message, 'Success');
          this.router.navigate([`/pages/p2p-usermanagement`]);
          this.spinnerService.hide()
        }
        else {
          this.onSubmit = false;
          this.toastrService.danger(userResponse.message, 'Error');
          this.router.navigate([`/pages/p2p-usermanagement`]);
          this.spinnerService.hide()
        }
      })
      setTimeout(() => {
        this.spinnerService.hide();
      }, 50);
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }


  pageChanged(): void {
    this.getUserTransactionList();

  }

  getAuditReport() {
    this.spinnerService.show()
    let params = {
      userId: this.currentId,
    };
    this.apiService.postRequest('admin/getUserAuditReport', params).subscribe((ress: any) => {
      console.log("🚀 ~ ViewUsermanagementComponent ~ this.apiService.postRequest ~ ress:", ress)
      // this.dataCount = userTransacListResponse.data
      if (ress.status) {
        this.userAuditList = ress.data
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

  getUserTransactionList() {
    this.spinnerService.show()
    let params = {
      type: "",
      user_id: this.currentId,
      page: this.page ? this.page : this.currentPage,
      length: 10,
      search: this.searchText
    };
    this.apiService.postRequest('users/getExportTransactionHistory', params).subscribe((userTransacListResponse: any) => {
      this.dataCount = userTransacListResponse.data
      if (userTransacListResponse.status) {
        this.userList = userTransacListResponse.data;
        this.length = this.userList.length
        this.totalItems = userTransacListResponse.recordsTotal;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

  expoHistory() {
    this.spinnerService.show()
    let params = {
      type: "",
      user_id: this.currentId,
      search: this.searchText
    };
    this.apiService.postRequest('users/getExportP2PTransactionHistory', params).subscribe((exportResponse: any) => {
      if (exportResponse.status) {
        this.userList = exportResponse.data;
        this.excelService.exportAsExcelFile(exportResponse.data, 'User Transaction List', 'P2P');
        this.spinnerService.hide();
      }
      else {
        this.toastrService.danger('Something went wrong, Please try again Later', 'Error');
        this.spinnerService.hide();
      }
    })
  }



  //Invidual Transactions Export History
  exportDepositHistory() {
    this.spinnerService.show()
    let params = {
      type: "Deposit",
      user_id: this.currentId,
      search: this.searchText
    };
    this.apiService.postRequest('users/getInvidualTransactionHistory', params).subscribe((exportDepositResponse: any) => {
      if (exportDepositResponse.status) {
        this.depositList = exportDepositResponse.data;
        this.exportWithdrawHistory();
      }
      else {
        this.toastrService.danger('Something went wrong, Please try again Later', 'Error');
        this.spinnerService.hide();
      }
    })
  }

  exportWithdrawHistory() {
    this.spinnerService.show()
    let params = {
      type: "Withdraw",
      user_id: this.currentId,
      search: this.searchText
    };
    this.apiService.postRequest('users/getInvidualTransactionHistory', params).subscribe((exportWithdrawResponse: any) => {
      if (exportWithdrawResponse.status) {
        this.withdrawList = exportWithdrawResponse.data;
        this.exportOTCHistory();
      }
      else {
        this.toastrService.danger('Something went wrong, Please try again Later', 'Error');
        this.spinnerService.hide();
      }
    })
  }

  exportOTCHistory() {
    this.spinnerService.show()
    let params = {
      type: "P2P",
      user_id: this.currentId,
      search: this.searchText
    };
    this.apiService.postRequest('users/getInvidualTransactionHistory', params).subscribe((exportOtcResponse: any) => {
      if (exportOtcResponse.status) {
        this.OtcList = exportOtcResponse.data;
        this.excelService.exportAsExcelWorkBookFile([this.OtcList, this.depositList, this.withdrawList], 'User P2P Transaction List', ['P2P', 'Deposit', 'Withdraw']);
        this.spinnerService.hide();
      }
      else {
        this.toastrService.danger('Something went wrong, Please try again Later', 'Error');
        this.spinnerService.hide();
      }
    })
  }


  // View Transaction
  viewTransaction(address: any) {
    this.apiService.openExplore(address)
  }

  exportAuditReport() {
    this.spinnerService.show()
    this.excelService.exportAsExcelWorkBookFile([this.userAuditList], 'User Audit Report','');
    this.spinnerService.hide();
  }

}












