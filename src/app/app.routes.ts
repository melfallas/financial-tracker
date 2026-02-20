import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'doc',
    loadComponent: () => import('./features/doc/doc-page/doc-page').then((m) => m.DocPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-page/about-page').then((m) => m.AboutPage),
  },
];
