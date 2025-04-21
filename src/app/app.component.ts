import {Component, isDevMode} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {currentUseCase, MswHandler} from '../mocks/browser';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billard';
  devMode = false;
  currentUseCaseFromLocalStorage = currentUseCase;
  useCases: {label: string, value: MswHandler}[] =
    [
      {label: 'Default', value: MswHandler.DEFAULT},
      {label: 'Use Case 001', value: MswHandler.USECASE_001},
      {label: 'Use Case 002', value: MswHandler.USECASE_002}
    ];


  constructor() {
    this.devMode = isDevMode();
  }

  onUseCaseChange(useCase: Event): void {
    const select = useCase.target as HTMLSelectElement;
    localStorage.setItem('useCase', select.value);
    window.location.reload();
  }
}
