import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuBag, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from '../../../service/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '../../../../environments/environment';




@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  template: `
    <nb-card class="own-scroll">
      <nb-card-header>
        Own scroll
      </nb-card-header>
      <nb-list
        nbInfiniteList
        [threshold]="500"
        (bottomThreshold)="loadNext(firstCard)">
        <nb-list-item *ngFor="let newsPost of firstCard.news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of firstCard.placeholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
      </nb-list>
    </nb-card>

    <nb-card>
      <nb-card-header>
        Window scroll
      </nb-card-header>
      <nb-list
        nbInfiniteList
        listenWindowScroll
        [threshold]="500"
        (bottomThreshold)="loadNext(secondCard)">
        <nb-list-item *ngFor="let newsPost of secondCard.news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of secondCard.placeholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,

})
export class HeaderComponent implements OnInit, OnDestroy {
  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };

  loginHistoryList: any = [];
  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  userList: any = [];
  length: any;
  totalCount: any;
  list: any;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  siteSetting: any = {};
  // totalCount: any = 10;
  // totalCount: any;

  themes = [
    {
      value: 'default',
      title: 'Light',
    },
    {
      value: 'dark',
      title: 'Dark',
    },
    {
      value: 'cosmic',
      title: 'Cosmic',
    },
    {
      value: 'corporate',
      title: 'Corporate',
    },
  ];


  userObj: any = {};

  currentTheme = 'default';
  userMenu = [
    // { icon: 'settings-2-outline', title: 'Site Settings' },
    // { icon: 'shield-off-outline', title: 'Authentication' },
    { icon: 'unlock-outline', title: 'Change Password' },
    { icon: 'keypad-outline', title: 'Change Pattern' },
    { icon: 'person-outline', title: 'Logout' }];

  subAdminMenu = [
    { icon: 'person-outline', title: 'Logout' }
  ]

  notificationMenu = [
    { title: 'Message Raised by' }];

  noticationRoute: string;
  isAdminWalletConnected: boolean;
  walletData: any;
  walletAddress: string;
  isSubAdmin: any;
  url: any;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private apiService: ApiService,
    public router: Router,
    public spinnerService: NgxSpinnerService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,

  ) {
  }

  ngOnInit() {
    this.apiService.ipCheck()
    this.isSubAdmin = localStorage.getItem('subAdminStatus')
    if (localStorage.getItem('isLogin') == 'true') {
      this.isAdminWalletConnected = true
      this.walletData = localStorage.getItem('shorttAddress')
      this.walletAddress = localStorage.getItem('WalletAddress')
    }

    this.getSiteSetting();
    this.currentTheme = this.themeService.currentTheme;
    this.themeService.getJsTheme().subscribe((data: any) => {
    })

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == 'Logout') {
          this.logout();
        }
        else if (title == 'Change Password') {
          this.router.navigate([`/pages/change-password`]);
        }
        else if (title == 'Change Pattern') {
          this.router.navigate([`/pages/change-pattern`]);
        } else if (title == 'Site Settings') {
          this.router.navigate([`/pages/settings`]);
        } else {
          this.router.navigate([`/pages/authentication`]);
        }
      });
  }




  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  pageChanged() {
    this.router.navigate(['/pages/notification'])
  }

  //Admin Notification

  // notificationList() {
  //   this.spinnerService.show()
  //   let params = {
  //     start: this.page ? this.page : this.currentPage,
  //     length: 10
  //   };

  //   this.apiService.postRequest('adminpage/getAdminNotification', params).subscribe((userListResponse: any) => {
  //     if (userListResponse.draw == 1) {
  //       this.userList = userListResponse.data
  //       this.length = this.userList.length
  //       this.totalItems = userListResponse.recordsTotal;
  //       this.spinnerService.hide();
  //     }
  //     else {
  //       this.spinnerService.hide();
  //     }
  //   })
  // }

  // getNotificationCount() {
  //   this.spinnerService.show()
  //   this.apiService.getRequest('adminpage/getAdminNotificationCount').subscribe((notificationResponse: any) => {
  //     if (notificationResponse.status == 200) {
  //       this.totalCount = notificationResponse.count > 0 ? notificationResponse.count : '';
  //       this.spinnerService.hide();
  //     }
  //     else {
  //       this.spinnerService.hide();
  //     }
  //   })
  // }

  // modifyNotificationCount() {
  //   this.spinnerService.show()
  //   this.apiService.getRequest('adminpage/updateAdminNotification').subscribe((notificationResponse: any) => {
  //     if (notificationResponse.status == 200) {
  //       this.getNotificationCount()
  //       this.spinnerService.hide();
  //     }
  //     else {
  //       this.spinnerService.hide();
  //     }
  //   })
  // }


 


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  getSiteSetting() {
    this.apiService.postRequest('admin/get_site_settings', {}).subscribe((settingResponse: any) => {
      if (settingResponse.status) {
        this.siteSetting = settingResponse.data;
      }
    })
  }

  logout() {
    this.toastrService.success('Logout Successfully', 'Logout');
    localStorage.clear();

    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);
  }

  redirect() {
    this.apiService.postRequest('admin/getModule', { id: localStorage.getItem('id') }).subscribe(async (suc: any) => {
      const item = suc.data.modules.find((element: any) => element.status == true);
      this.url = item?.link
      if (localStorage.getItem('subAdminStatus') == 'true') {
        this.router.navigate([`${this.url}`]);
      }
      else {
        this.router.navigate([`/pages/dashboard`]);
      }
    })
  }



  copyText() {
    this.apiService.copyText(this.walletAddress)
    this.toastrService.success("Address Copied...", "Info")
  }
}
