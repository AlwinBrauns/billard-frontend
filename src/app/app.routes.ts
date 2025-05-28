import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'game/:id/join',
    loadComponent: () => import('./pages/game/join-game/join-game.component')
      .then(m => m.JoinGameComponent),
    canMatch: [authGuard],
  },
  {
    path: 'game/:id',
    component: HomeComponent,
    canMatch: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
