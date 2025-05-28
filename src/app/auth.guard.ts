import {CanMatchFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService, UserState} from './auth.service';

export const authGuard: CanMatchFn = (_, __) => {
  const authService = inject(AuthService);
  return authService.userState() === UserState.LOGGED_IN_PAGE;
};
