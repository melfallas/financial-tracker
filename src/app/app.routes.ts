import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'doc',
    loadComponent: () => import('./doc-page/doc-page').then((m) => m.DocPage),
  },
];
