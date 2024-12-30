import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
// @ts-ignore
import PatternLock from 'patternlock';
import { ApiService } from '../../../service/api/api.service';

declare let window: any;

@Component({
  selector: 'ngx-addsubadmin',
  templateUrl: './addsubadmin.component.html',
  styleUrls: ['./addsubadmin.component.scss']
})
export class AddsubadminComponent implements OnInit {


  patterncode: any = '';
  onSubmit: boolean = false;
  onDisabled: boolean = false;
  check: any
  subadminobj: any = {}
  array: any = []

  list: any = [
    // {
    //   title: 'Dashboard',
    //   icon: 'home-outline',
    //   link: '/pages/dashboard',
    // },
    // {
    //   title: 'MANAGMENTS',
    //   group: true,
    // },
    // {
    //   title: 'User Management',
    //   icon: 'person-add-outline',
    //   children: [
    //     {
    //       title: 'User List',
    //       icon: 'menu-2-outline',
    //       link: '/pages/p2p-usermanagement',
    //     },
    //     {
    //       title: 'KYC Management',
    //       icon: 'lock-outline',
    //       link: '/pages/kyc-management',
    //     },
    //   ]
    // },
    // {
    //   title: 'CMS Management',
    //   icon: 'clipboard-outline',
    //   link: '/pages/cms-management',
    // },
    // {
    //   title: 'FAQ Management',
    //   icon: 'info-outline',
    //   link: '/pages/faq-management',
    // },
    // {
    //   title: 'Homepage Management',
    //   icon: 'layout-outline',
    //   link: '/pages/mainhome-banner-management',
    // },
    // {
    //   title: 'Currency Management',
    //   icon: 'shield-off-outline',
    //   link: '/pages/p2p-token-management',
    // },
    // {
    //   title: 'Deposit History',
    //   icon: 'arrow-downward-outline',
    //   link: '/pages/p2p-depositHistory',
    // },
    // {
    //   title: 'Withdraw History',
    //   icon: 'arrow-upward-outline',
    //   link: '/pages/p2p-withdrawHistory',
    // },
    // {
    //   title: 'Sub-Admin',
    //   icon: 'book-outline',
    //   link: '/pages/subadmin',
    // },
    // {
    //   title: 'P2P Management',
    //   icon: 'grid-outline',
    //   children: [
    //     {
    //       title: 'Payment Management',
    //       icon: 'plus-square-outline',
    //       link: '/pages/payment-management',
    //     },

    // {
    //   title: 'Internal Transfer History',
    //   icon: 'arrow-forward-outline',
    //   link: '/pages/internal-transfer-history',
    // },
    //     {
    //       title: 'Order Management',
    //       icon: 'folder-outline',
    //       link: '/pages/p2p-order-management',
    //       children: [
    //         {
    //           title: 'All Order',
    //           icon: 'list-outline',
    //           link: '/pages/p2p-order-management/p2p-allorder',
    //         },
    //         {
    //           title: 'Open Order',
    //           icon: 'list-outline',
    //           link: '/pages/p2p-order-management/p2p-openorder',
    //         },
    //         {
    //           title: 'Cancel Order',
    //           icon: 'list-outline',
    //           link: '/pages/p2p-order-management/p2p-cancelorder',
    //         },
    //         {
    //           title: 'Complete Order',
    //           icon: 'list-outline',
    //           link: '/pages/p2p-order-management/p2p-completeorder',
    //         },
    //         {
    //           title: 'Disputed Order',
    //           icon: 'list-outline',
    //           link: '/pages/p2p-order-management/p2p-disputeorder',
    //         },
    //       ]
    //     },
    //   ],
    // },
    {
      title: 'Support Ticket',
      icon: 'message-square-outline',
      link: '/pages/p2p-suppportTicket',
    },
    {
      title: 'Contact Us',
      icon: 'menu-2-outline',
      link: '/pages/contactus',
    },
    // {
    //   title: 'TEMPLATES',
    //   group: true,
    // },
    // {
    //   title: 'Email Template',
    //   icon: 'email-outline',
    //   link: '/pages/email-template',
    // }
  ]
  showPassword: boolean;

  status: any
  child: any;
  enable: boolean = false;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }




  ngOnInit(): void {
    this.apiService.ipCheck()
  }

  ngAfterViewInit() {
    var that = this;
    var lock = new PatternLock('#patternContainer', {
      onDraw: function (patterncode: any) {
        var pat = lock.getPattern();
        that.patterncode = pat;
        if (that.patterncode.length <= 2) {
          alert('your pattern is too short');
          lock.reset();
        }
        else {
          that.patterncode = pat;
          window.patternCodeGet = that.patterncode;
        }
      },
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  doSomething(event: any) {
    if (event.target.checked == true) {
      this.subadminobj.modules = this.list
    }
    else {
      this.subadminobj.modules = this.list
    }
  }

  doRead(event: any) {
    if (event.target.checked == true) {
      this.subadminobj.modules = this.list
    }
    else {
      this.subadminobj.modules = this.list
    }
  }

  doWrite(event: any) {
    if (event.target.checked == true) {
      this.subadminobj.modules = this.list
    }
    else {
      this.subadminobj.modules = this.list
    }
  }

  submitLogin(cmsAddForm: NgForm) {
    this.spinnerService.show()
    this.subadminobj.modules = this.list
    this.subadminobj.pattern = window.patternCodeGet
    this.onSubmit = true

    const item = this.list.find((element: any) => {
      return element.status == true
    })
    if (item && !item.status) {
      this.status = "* Please Check the modules to allow"
    }
    else if (item == 'undefined' || item == undefined) {
      this.status = "* Please Check the modules to allow"
    }
    else {
      this.status = ""
    }

    if (cmsAddForm.valid && this.subadminobj.pattern && this.subadminobj.pattern != '' && this.status == "") {
      this.apiService.postRequest('admin/subAdmin_Register', this.subadminobj).subscribe((register: any) => {
        if (register.status) {
          this.toastrService.success(register.message, 'Success');
          this.onSubmit = false
          this.router.navigate(['/pages/subadmin'])
        }
        else
          this.toastrService.danger(register.message, 'Error !!');
        cmsAddForm.reset()
      })
    }
    else {
      this.toastrService.danger('Please fill required fields', "Error !!");
    }
    this.spinnerService.hide()

  }





}
