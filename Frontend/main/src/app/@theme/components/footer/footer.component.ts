import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by copy">{{ copyrighttext }}</span>
  `,
})
export class FooterComponent {

  footer: any;
  copyrighttext: any;

  constructor(
    private apiService: ApiService
  ) {
    this.getSiteDetails()
  }

  getSiteDetails() {
    this.apiService.postRequest('admin/get_site_settings', {}).subscribe((siteResponse: any) => {
      if (siteResponse.status) {
        this.footer = siteResponse.data;
        this.copyrighttext = this.footer.copy_right_text
      }
    })
  }
}
