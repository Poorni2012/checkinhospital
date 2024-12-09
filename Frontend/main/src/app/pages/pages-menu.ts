import { NbMenuItem } from '@nebular/theme';
import { title } from 'process';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'MANAGMENTS',
    group: true,
  },
  
  {
    title: 'Check In Management',
    icon: 'clipboard-outline',
    link: '/pages/checkin',
  },
  {
    title: 'CheckIn History',
    icon: 'clipboard-outline',
    link: '/pages/checkinhistory',
  },



];
