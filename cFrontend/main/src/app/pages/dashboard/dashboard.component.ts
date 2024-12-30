import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { ApiService } from '../../service/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value: Number,
  link: string
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;

  totalUserCard: CardSettings = {
    title: 'Total Users',
    iconClass: 'nb-person',
    type: 'primary',
    value: 0,
    link: '/pages/p2p-usermanagement'
  };
  // activeUserCard: CardSettings = {
  //   title: 'Active Users',
  //   iconClass: 'nb-checkmark-circle',
  //   type: 'success',
  //   value: 0,
  //   link: '/pages/p2p-usermanagement'
  // };
  // kycUnVerifiedUserCard: CardSettings = {
  //   title: 'KYC Unverified Users',
  //   iconClass: 'nb-danger',
  //   type: 'danger',
  //   value: 0,
  //   link: '/pages/kyc-management'
  // };
  // kycVerifiedUserCard: CardSettings = {
  //   title: 'KYC Verified Users',
  //   iconClass: 'nb-locked',
  //   type: 'warning',
  //   value: 0,
  //   link: '/pages/kyc-management'
  // };
  // depositCard: CardSettings = {
  //   title: 'Total Deposit',
  //   iconClass: 'nb-list',
  //   type: 'info',
  //   value: 0,
  //   link: '/pages/p2p-depositHistory'
  // };
  // withdrawCard: CardSettings = {
  //   title: 'Total Withdraw',
  //   iconClass: 'nb-tables',
  //   type: 'warning',
  //   value: 0,
  //   link: '/pages/p2p-withdrawHistory'
  // };
  // openOrderCard: CardSettings = {
  //   title: 'Open Orders',
  //   iconClass: 'nb-list',
  //   type: 'info',
  //   value: 0,
  //   link: '/pages/p2p-order-management/p2p-openorder'
  // };
  // completeOrderCard: CardSettings = {
  //   title: 'Completed Orders',
  //   iconClass: 'nb-list',
  //   type: 'danger',
  //   value: 0,
  //   link: '/pages/p2p-order-management/p2p-completeorder'
  // };
  // closedOrderCard: CardSettings = {
  //   title: 'Closed Orders',
  //   iconClass: 'nb-list',
  //   type: 'success',
  //   value: 0,
  //   link: '/pages/p2p-order-management/p2p-cancelorder'
  // };
  // disputeOrderCard: CardSettings = {
  //   title: 'Disputed Orders',
  //   iconClass: 'nb-list',
  //   type: 'primary',
  //   value: 0,
  //   link: '/pages/p2p-order-management/p2p-disputeorder'
  // };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.totalUserCard,
    // this.activeUserCard,
    // this.kycUnVerifiedUserCard,
    // this.kycVerifiedUserCard,
    // this.depositCard,
    // this.withdrawCard,
    // this.openOrderCard,
    // this.completeOrderCard,
    // this.closedOrderCard,
    // this.disputeOrderCard
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.totalUserCard,
          type: 'warning',
        },
        // {
        //   ...this.activeUserCard,
        //   type: 'primary',
        // },
        // {
        //   ...this.kycUnVerifiedUserCard,
        //   type: 'danger',
        // },
        // {
        //   ...this.kycVerifiedUserCard,
        //   type: 'info',
        // },
        // {
        //   ...this.depositCard,
        //   type: 'success',
        // },
        // {
        //   ...this.withdrawCard,
        //   type: 'info',
        // },
        // {
        //   ...this.openOrderCard,
        //   type: 'warning',
        // },
        // {
        //   ...this.completeOrderCard,
        //   type: 'primary',
        // },
        // {
        //   ...this.closedOrderCard,
        //   type: 'danger',
        // },
        // {
        //   ...this.disputeOrderCard,
        //   type: 'primary',
        // },
      ],
      dark: this.commonStatusCardsSet,
    };

  loginHistoryList: any = [];
  totalItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  writeStatus: any;

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private apiService: ApiService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

    // this.getLoginHistoryList();
    this.getDashboardData();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  pageChanged(): void {
    this.page = this.page;
    this.getLoginHistoryList();
  }

  getLoginHistoryList() {
    this.spinner.show();
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10
    };
    this.apiService.postRequest('admin/loginhistory', params).subscribe((historyResponse: any) => {
      if (historyResponse.status) {
        this.loginHistoryList = historyResponse.data;
        this.totalItems = historyResponse.totalData;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  getDashboardData() {
    this.apiService.postRequest('v1/auth/userCount', {}).subscribe((dashboardResponse: any) => {
      if (dashboardResponse.status) {
        this.totalUserCard.value = dashboardResponse.widgetData.totalUsers || 0;
        // this.activeUserCard.value = dashboardResponse.widgetData.totalActiveUsers || 0;
        // this.kycUnVerifiedUserCard.value = dashboardResponse.widgetData.totalKYCUnVerifiedUsers || 0;
        // this.kycVerifiedUserCard.value = dashboardResponse.widgetData.totalKYCVerifiedUsers || 0;
        // this.depositCard.value = dashboardResponse.widgetData.totalDepositCount || 0;
        // this.withdrawCard.value = dashboardResponse.widgetData.totalWithdrawCount || 0;
        // this.openOrderCard.value = dashboardResponse.widgetData.totalOpenOrderCount || 0;
        // this.completeOrderCard.value = dashboardResponse.widgetData.totalCompleteOrderCount || 0;
        // this.closedOrderCard.value = dashboardResponse.widgetData.totalClosedOrderCount || 0;
        // this.disputeOrderCard.value = dashboardResponse.widgetData.totalDisputeOrderCount || 0;
      }
    })
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
