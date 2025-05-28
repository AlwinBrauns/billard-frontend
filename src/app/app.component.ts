import {Component, isDevMode} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {currentUseCase, MswHandler, mwsHandlerToWorker} from '../mocks/handlers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgForOf, FormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public static LOCAL_STORAGE_KEYCLOAK_BRICKED_NAME = 'keycloak-brick';
  public static LOCAL_STORAGE_KEYCLOAK_BRICKED_ACTIVE = 'bricked';
  devMode = false;
  currentUseCaseFromLocalStorage = currentUseCase;
  useCases: { label: string, value: MswHandler }[] =
    [
      {label: 'Default', value: MswHandler.DEFAULT},
      {label: 'Proxy to localhost', value: MswHandler.LOCALHOST_PROXY},
      {label: 'Network Error', value: MswHandler.NETWORK_ERROR},
      {label: 'Use Case 001', value: MswHandler.USECASE_001},
      {label: 'Use Case 002', value: MswHandler.USECASE_002}
    ];
  // Form models ---
  useCase: MswHandler = currentUseCase;
  mswEnabled: boolean = true;
  brickedKeycloak: boolean = localStorage.getItem(AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_NAME) === AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_ACTIVE;
  // --------------
  devWindowState: 'floating' | 'minimized' = 'floating';

  constructor() {
    this.devMode = isDevMode();
  }

  toggleDevWindowState(): void {
    this.devWindowState = this.devWindowState === 'floating' ? 'minimized' : 'floating';
  }

  async onUseCaseChange(): Promise<void> {
    if (this.devMode) {
      const {worker} = await import('../mocks/browser');
      localStorage.setItem('useCase', this.useCase.toString());
      const mswWorker = mwsHandlerToWorker[this.useCase];
      worker.resetHandlers(...mswWorker);
      if (confirm('Willst du die Seite neu laden?')) {
        window.location.reload();
      }
    }
  }

  async onMswChange(value: boolean): Promise<void> {
    if (this.devMode) {
      const {worker} = await import('../mocks/browser');
      if (value) {
        await worker.start();
      } else {
        worker.stop();
      }
    }
  }

  async onBrickedKeycloakChange(value: boolean): Promise<void> {
    if (this.devMode) {
      if (value) {
        localStorage.setItem(AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_NAME, AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_ACTIVE);
      } else {
        localStorage.setItem(AppComponent.LOCAL_STORAGE_KEYCLOAK_BRICKED_NAME, 'real');
      }
      if (confirm('Willst du die Seite neu laden?')) {
        window.location.reload();
      }
    }
  }

  async restoreHandlerMsw(): Promise<void> {
    if (this.devMode) {
      const {worker} = await import('../mocks/browser');
      worker.restoreHandlers();
    }
  }
}
