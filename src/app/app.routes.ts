import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page').then((m) => m.TrendingPage),
      },

      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page').then((m) => m.SearchPage),
      },
      {
        path: 'history/:query',
        loadComponent: () => import('./gifs/pages/gif-history/gif-history').then((m) => m.GifHistory),
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
