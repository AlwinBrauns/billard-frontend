import {Injectable, isDevMode, signal} from '@angular/core';
import {KeycloakInitOptions, KeycloakProfile} from 'keycloak-js';
import {KeycloakInstance} from '../main';
import {AppComponent} from './app.component';

export enum UserState {
  LOADING,
  NOT_LOGGED_IN,
  DISABLED,
  LOGGED_IN_PAGE
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userState = signal(UserState.NOT_LOGGED_IN);
  public userProfile = signal<KeycloakProfile | null>(null);

  loadProfile = async () => {
    this.userProfile.set(await KeycloakInstance.loadUserProfile());
    if (this.userProfile()) {
      this.userState.set(UserState.LOGGED_IN_PAGE);
      if (this.userProfile()?.enabled === false) {
        this.userState.set(UserState.DISABLED)
      }
    } else {
      this.userState.set(UserState.NOT_LOGGED_IN)
    }
  };

  brickedLoadProfile = async () => {
    //copied from keycloak lib
    function createPromise() {
      var p = {
        //@ts-ignore
        setSuccess: function (result) {
          //@ts-ignore
          p.resolve(result);
        },
        //@ts-ignore
        setError: function (result) {
          //@ts-ignore
          p.reject(result);
        }
      };
      //@ts-ignore
      p.promise = new Promise(function (resolve, reject) {
        //@ts-ignore
        p.resolve = resolve;
        //@ts-ignore
        p.reject = reject;
      });
      return p;
    }
    KeycloakInstance.loadUserProfile = function () {
      const url = "https://auth.bybrauns.com/realms/bybrauns/account";
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.setRequestHeader("Accept", "application/json");
      req.setRequestHeader("Authorization", "bearer " + "bricked");
      const promise = createPromise();
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status == 200) {
            //MSW mocked user
            KeycloakInstance.profile = JSON.parse(req.responseText);
            promise.setSuccess(KeycloakInstance.profile);
          } else {
            promise.setSuccess(
              <KeycloakProfile>{
                "id": "2000cdcd-4888-4abe-be36-7038777d3058",
                "username": "msw",
                "firstName": "Bricked",
                "lastName": "Bricked",
                "email": "mocked@test.de",
                "emailVerified": true,
              }
            );
          }
        }
      };
      req.send();
      //@ts-ignore
      return promise.promise;
    };

    this.userState.set(UserState.LOGGED_IN_PAGE);
    this.userProfile.set(await KeycloakInstance.loadUserProfile());
    KeycloakInstance.idToken = "bricked";
  }

  constructor() {
    if (isDevMode() && localStorage.getItem(AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_NAME) === AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_ACTIVE) {
      this.brickedLoadProfile().then(r => console.log('[DEV] Keycloak Bricked'));
      return;
    }
    this.userState.set(UserState.NOT_LOGGED_IN);
    KeycloakInstance.onReady = async (authenticated: boolean | undefined) => {
      this.userState.set(UserState.LOADING);
      if (!authenticated) {
        this.userState.set(UserState.NOT_LOGGED_IN);
        return;
      }
      await this.loadProfile();
    }
    KeycloakInstance.onAuthLogout = () => {
      this.userState.set(UserState.NOT_LOGGED_IN);
    }
    KeycloakInstance.onAuthError = () => {
      this.userState.set(UserState.NOT_LOGGED_IN);
    }
    KeycloakInstance.onAuthRefreshError = () => {
      this.userState.set(UserState.NOT_LOGGED_IN);
    }
    KeycloakInstance.init(<KeycloakInitOptions>{
      onLoad: "check-sso",
      pkceMethod: "S256",
    }).then(value => {
      console.log("Keycloak is ready: " + value);
    });
  }
}
