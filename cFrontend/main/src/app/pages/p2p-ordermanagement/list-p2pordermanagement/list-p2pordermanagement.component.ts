import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-list-p2pordermanagement',
  templateUrl: './list-p2pordermanagement.component.html',
  styleUrls: ['./list-p2pordermanagement.component.scss']
})
export class ListP2pordermanagementComponent implements OnInit {

  currencyList: any = [];
  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  private alive = true;

  solarValue: number;
  orderList: any = [];
  value: any;

  alldata: boolean = false
  activedata: boolean = true
  completedata: boolean = false
  chanceldata: boolean = false
  disputedata: boolean = false
  addUrl: string;
  totalItemsOpen: number;
  totalItemsClose: number;
  totalItemsComplete: number;
  totalItemsAll: number;
  totalItemsDispute: number;

  searchValue: any = '';

  constructor(private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.addUrl = this.router.url;

    // listall order
    if (this.addUrl == '/pages/p2p-order-management/p2p-listallorder') {
      this.alldata = true;
      this.activedata = false;
      this.completedata = false;
      this.chanceldata = false;
      this.disputedata = false;
      this.getAllOrderList();
    }
    //all
    else if (this.addUrl == '/pages/p2p-order-management/p2p-allorder') {
      this.alldata = true;
      this.activedata = false;
      this.completedata = false;
      this.chanceldata = false;
      this.disputedata = false;
      this.getAllOrderList();

    }
    //open
    else if (this.addUrl == '/pages/p2p-order-management/p2p-openorder') {
      this.alldata = false;
      this.activedata = true;
      this.completedata = false;
      this.chanceldata = false;
      this.disputedata = false;
      this.getOpenOrderList();

    }
    //complete
    else if (this.addUrl == '/pages/p2p-order-management/p2p-completeorder') {
      this.alldata = false;
      this.activedata = false;
      this.completedata = true;
      this.chanceldata = false;
      this.disputedata = false;
      this.getCompleteOrderList();

    }
    //cancel
    else if (this.addUrl == '/pages/p2p-order-management/p2p-cancelorder') {
      this.alldata = false;
      this.activedata = false;
      this.completedata = false;
      this.chanceldata = true;
      this.disputedata = false;
      this.getCloseOrderList();

    }

    else if (this.addUrl == '/pages/p2p-order-management/p2p-disputeorder') {
      this.alldata = false;
      this.activedata = false;
      this.completedata = false;
      this.chanceldata = false;
      this.disputedata = true;
      this.getDisputeOrderList()
    }

    else if (this.addUrl == '/pages/p2p-order-management/p2p-disputelistorder') {
      this.alldata = false;
      this.activedata = false;
      this.completedata = false;
      this.chanceldata = false;
      this.disputedata = true;
      this.getAdminDisputeOrderList()
    }
    else if (this.addUrl == '/pages/p2p-order-management/p2p-list-all-order') {
      this.alldata = true;
      this.activedata = false;
      this.completedata = false;
      this.chanceldata = false;
      this.disputedata = false;
      this.getAllOrderListInprogress();
    }
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()

  }


  pageChanged(type: any): void {
    if (type == 'allOrders') {
      this.getAllOrderList();
    }
    if (type == 'openOrders') {
      this.getOpenOrderList();
    }
    if (type == 'closeOrders') {
      this.getCloseOrderList();
    }
    if (type == 'completeOrders') {
      this.getCompleteOrderList();
    }
    if (type == 'disputeOrders') {
      this.getDisputeOrderList();
    }
    if (type == 'disputeListOrders') {
      this.getAdminDisputeOrderList();
    }
  }

  getOpenOrderList() {
    this.spinnerService.show()
    let params = {
      search: 'processing',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllOrders', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        this.orderList = orderResponse.data;
        this.totalItemsOpen = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsOpen = 0
        this.spinnerService.hide();
      }
    })
  }


  getCloseOrderList() {
    this.spinnerService.show()
    let params = {
      search: 'cancelled',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllOrders', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        this.orderList = orderResponse.data;
        this.totalItemsClose = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsClose = 0;
        this.spinnerService.hide()
      }
    })
  }


  getCompleteOrderList() {
    this.spinnerService.show()
    let params = {
      search: 'completed',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllOrders', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        this.orderList = orderResponse.data;
        this.totalItemsComplete = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsComplete = 0;
        this.spinnerService.hide()
      }
    })
  }


  getAllOrderList() {
    this.spinnerService.show()
    let params = {
      search: 'all',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllOrders', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        this.orderList = orderResponse.data;
        this.totalItemsAll = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsAll = 0;
        this.spinnerService.hide()
      }
    })
  }


  getDisputeOrderList() {
    this.spinnerService.show()
    let params = {
      search: 'disputed',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllOrders', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        this.orderList = orderResponse.data;
        this.totalItemsDispute = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsDispute = 0;
        this.spinnerService.hide()
      }
    })
  }

  getAdminDisputeOrderList() {
    this.spinnerService.show()
    let params = {
      search: 'disputed',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllDisputeList', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        this.orderList = orderResponse.data;
        this.totalItemsDispute = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsDispute = 0;
        this.spinnerService.hide()
      }
    })
  }
  public trackByFn(index: number, item: any): number {
    return item._id;
  }

  getAllOrderListInprogress() {
    console.log("in progresss.../")
    this.spinnerService.show()
    let params = {
      search: 'all',
      start: this.page ? this.page : this.currentPage,
      length: 10,
      searchValue: this.searchValue
    };
    this.apiService.postRequest('exchange/getAllOrders', params).subscribe((orderResponse: any) => {
      if (orderResponse.data) {
        let arr = []
        orderResponse.data.forEach(element => {
          if (element?.buyer_status != 'completed' && element?.buyer_status != 'expired' && element?.buyer_status != 'cancelled' && element?.seller_status != 'completed' && element?.seller_status != 'expired' && element?.seller_status != 'cancelled') {
            arr.push(element)
          }
        });

        this.orderList = arr
        this.totalItemsAll = orderResponse.recordsTotal;
        this.spinnerService.hide()
      }
      else {
        this.orderList = [];
        this.totalItemsAll = 0;
        this.spinnerService.hide()
      }
    })
  }

}
