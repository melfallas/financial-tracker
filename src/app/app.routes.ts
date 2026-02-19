import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'doc',
    loadComponent: () => import('./doc-page/doc-page').then((m) => m.DocPage),
  },
];
