import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../@core/utils';
import { MENU_ITEMS } from './pages-menu';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
    // <a (click)="toggleSidebar()" href="#" class="sidebar-toggle">
    //   <nb-icon icon="menu-2-outline"></nb-icon>
    // </a> 
    <nb-menu [items]="filtered" *ngIf="isSubAdmin=='true'"></nb-menu>
    <nb-menu [items]="menu" *ngIf="isSubAdmin=='false'"> </nb-menu>
    <router-outlet></router-outlet>

    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  isSubAdmin: any;
  filtered: any = [];
  urls: any = [];
  menulist: any;
  accesslist: any;

  constructor(private sidebarService: NbSidebarService, private layoutService: LayoutService, private apiService: ApiService, public router: Router) {
  }

  ngOnInit(): void {
    this.isSubAdmin = localStorage.getItem("subAdminStatus")
    this.setSideMenu()
  }


  setSideMenu() {
    if (this.isSubAdmin == 'false') {
      let a = this.menu
    }
    else {
      let a = this.menu
      this.apiService.postRequest('admin/getModule', { id: localStorage.getItem('id') }).subscribe((suc: any) => {
        if (suc.status) {
          let b = suc.data.modules
          let c = [...a, ...b];
          c.forEach((item: any) => {
            if (item.status == true)
              this.filtered.push(item)
          })
        }
      })
    }
  }
  

  // setSideMenu() {
  //   if (this.isSubAdmin == 'false') {
  //     this.menulist = this.menu
  //   }
  //   else {
  //     this.menulist = this.menu
  //     this.apiService.postRequest('admin/getModule', { id: localStorage.getItem('id') }).subscribe((suc: any) => {
  //       if (suc.status) {
  //         this.accesslist = suc.data.modules;
  //         if (this.accesslist.length > 0) {
  //           this.accesslist = this.accesslist.filter((item: any) => item.status == true)

  //           this.menulist.map((item: any) => {
  //             let index = this.accesslist.findIndex((subItem: any) => {
  //               return (subItem.status == item.status)
  //             })
  //             if (index == -1) {
  //               item.status = true;
  //               if (item.children && item.children.length > 0) {
  //                 item.children.map((childItem: any) => {
  //                   let childiIndex = this.accesslist.findIndex((subItem: any) => (subItem.status == childItem.status));
  //                   // })
  //                   if (childiIndex == -1) {
  //                     childItem.status = true;
  //                   }
  //                   else {
  //                     item.status = false;
  //                     childItem.status = false;
  //                   }
  //                 })
  //               }
  //             } else {
  //               item.status = false;
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
  // }


  menu = MENU_ITEMS;

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

}
