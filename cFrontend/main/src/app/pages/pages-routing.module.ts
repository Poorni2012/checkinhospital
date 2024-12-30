import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'cms-management',
      loadChildren: () => import('./cms-management/cms-management.module').then(m => m.CmsManagementModule),
    },
    {
      path: 'checkin',
      loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)
    },
    {
      path: 'checkinhistory',
      loadChildren: () => import('./checkinhistory/checkinhistory.module').then(m => m.CheckinhistoryModule),
    },
    {
      path: 'faq-management',
      loadChildren: () => import('./faq-management/faq-management.module').then(m => m.FaqManagementModule),
    },
    {
      path: 'email-template',
      loadChildren: () => import('./email-template/email-template.module').then(m => m.EmailTemplateModule),
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    },
    {
      path: 'authentication',
      loadChildren: () => import('./authentication-settings/authentication-settings.module').then(m => m.AuthenticationSettingsModule),
    },
    {
      path: 'change-password',
      loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule),
    },
    {
      path: 'change-pattern',
      loadChildren: () => import('./change-pattern/change-pattern.module').then(m => m.ChangePatternModule),
    },
    {
      path: 'mainhome-banner-management',
      loadChildren: () => import('./mainhome-banner/mainhome-banner.module').then(m => m.MainhomeBannerModule),
    },
    {
      path: 'homepage-content-management',
      loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
    },
    {
      path: 'p2p-token-management',
      loadChildren: () => import('./p2p-tokenmanagemenent/p2p-tokenmanagemenent.module').then(m => m.P2pTokenmanagemenentModule),
    },
    {
      path: 'p2p-order-management',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-listallorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-list-all-order',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-allorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-openorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-completeorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-cancelorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-disputeorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'p2p-order-management/p2p-disputelistorder',
      loadChildren: () => import('./p2p-ordermanagement/p2p-ordermanagement.module').then(m => m.P2pOrdermanagementModule),
    },
    {
      path: 'payment-management',
      loadChildren: () => import('./p2p-payment-management/p2p-payment-management.module').then(m => m.P2pPaymentManagementModule),
    },
    {
      path: 'p2p-usermanagement',
      loadChildren: () => import('./p2p-usermanagement/p2p-usermanagement.module').then(m => m.P2pUsermanagementModule),
    },
    {
      path: 'p2p-suppportTicket',
      loadChildren: () => import('./p2p-supportticket/p2p-supportticket.module').then(m => m.P2pSupportticketModule),
    },
    {
      path: 'contactus',
      loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
    },
    {
      path: 'p2p-depositHistory',
      loadChildren: () => import('./p2p-deposithis/p2p-deposithis.module').then(m => m.P2pDeposithisModule),
    },
    {
      path: 'p2p-withdrawHistory',
      loadChildren: () => import('./p2p-withdrawhistory/p2p-withdrawhistory.module').then(m => m.P2pWithdrawhistoryModule),
    },
    {
      path: 'internal-transfer-history',
      loadChildren: () => import('./internal-transfer-history/internal-transfer-history.module').then(m => m.InternalTransferHistoryModule),
    },
    {
      path: 'kyc-management',
      loadChildren: () => import('./p2p-kycmanagement/p2p-kycmanagement.module').then(m => m.P2pKycmanagementModule),
    },
    {
      path: 'notification',
      loadChildren: () => import('./p2p-notification/p2p-notification.module').then(m => m.P2pNotificationModule),
    },
    {
      path: 'feedbackhistory',
      loadChildren: () => import('./feedbackhistory/feedbackhistory.module').then(m => m.FeedbackhistoryModule)
    },
    {
      path: 'getAllPosts',
      loadChildren: () => import('./p2p-listing/p2p-listing.module').then(m => m.P2pListingModule)
    },
    {
      path: 'subadmin',
      loadChildren: () => import('./subadmin/subadmin.module').then(m => m.SubadminModule),
    },
    {
      path: 'authip',
      loadChildren: () => import('./authIP/authip.module').then(m => m.AuthIpModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
