import {HttpInterceptorFn} from '@angular/common/http';
import {KeycloakInstance} from '../main';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = KeycloakInstance.idToken;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
