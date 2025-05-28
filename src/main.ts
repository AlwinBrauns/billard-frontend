import './openapi.config';
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {isDevMode} from '@angular/core';
import Keycloak from 'keycloak-js';
import {ErrorResponse} from './api/billard/generated';

const keycloak = new Keycloak({
  url: "https://auth.bybrauns.com/",
  realm: "bybrauns",
  clientId:
    window.origin.includes("dev") || window.origin.includes("localhost")
      ? "dev-bybrauns"
      : "bybrauns",
});

export const KeycloakInstance = keycloak;

export const NetworkError: ErrorResponse = {
  message: 'Network error. Please check your connection.',
}

// Tests should manually import the worker
async function prepareApp() {
  if (isDevMode() && !(window as any).__karma__) {
    const {worker} = await import('./mocks/browser');
    // @ts-ignore
    window.__dev = {worker: worker};
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
})
