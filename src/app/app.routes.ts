import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'doc',
    loadComponent: () => import('@features/doc/doc-page/doc-page').then((m) => m.DocPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('@features/contact/contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'about',
    loadComponent: () => import('@features/about/about-page/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'financial-tools/compound-interest',
    loadComponent: () =>
      import('@features/financial-tools/compound-interest/calculator/calculator').then(
        (m) => m.Calculator
      ),
  },
];
