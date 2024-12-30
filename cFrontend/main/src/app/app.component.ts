/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { NbThemeService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiService } from './service/api/api.service';

@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet>
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#3667DD" type = "ball-spin-clockwise-fade" [fullScreen] = "true">
    <p style="color:black">Please wait...</p>
  </ngx-spinner>`,
})
export class AppComponent implements OnInit {

  isBasicServiceRendered: boolean | undefined;
  favIcon: any = document.querySelector('#appIcon');
  lastChange: string = '';

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private themeService: NbThemeService,
    private spinnerService: NgxSpinnerService,
   
    public apiService: ApiService
  ) {
    // this.getSiteDetails();
    this.analytics.disableRightClick();
  }

  ngOnInit(): void {
    console.log("##")
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.apiService.ipCheck()
  }





  getSiteDetails() {
    this.apiService.postRequest('admin/get_site_settings', {}).subscribe((suc: any) => {
      if (suc.status == true) {
        this.favIcon.href = suc.data.site_favicon;
      }
    })
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent): void {
    if (event.key === 'isAdminLogin') {
      this.lastChange = event.newValue || '';
      if (this.lastChange == 'false' || this.lastChange == 'true') {
        window.location.reload();
      }
    }
    else if (event.key == null || event.key == undefined || event.key == '') {
      window.location.reload();
    }
  }
}
