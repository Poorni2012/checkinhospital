import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-ip-whitelist',
  templateUrl: './ip-whitelist.component.html',
  styleUrls: ['./ip-whitelist.component.scss']
})
export class IpWhitelistComponent implements OnInit {

  token: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService
  ) {
    this.addIp();
  }

  ngOnInit(): void {
  }

  addIp() {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.apiService.getRequest('admin/ip_white_list/' + this.token).subscribe((whiteListResponse: any) => {
      if (!whiteListResponse.status) {
        this.toastrService.danger(whiteListResponse.message, 'Error !!');
        this.router.navigateByUrl('/404');
      } else {
        this.toastrService.success(whiteListResponse.message, 'Success');
        this.router.navigate([`/auth/login`]);
      }
    });
  }
}
