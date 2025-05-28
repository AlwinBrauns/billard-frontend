import {Component, input, InputSignal} from '@angular/core';
import {Router} from "@angular/router";
import {GameEvent} from '../../../../api/billard/generated';
import {NgClass, NgIf} from '@angular/common';
import {toObservable} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';

@Component({
  selector: 'app-game-event-modal',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './game-event-modal.component.html',
  styleUrl: './game-event-modal.component.css'
})
export class GameEventModalComponent {

  gameEvent: InputSignal<GameEvent> = input.required();
  open: boolean = false;
  newWhileOpen: boolean = false;

  constructor(protected router: Router) {
    toObservable(this.gameEvent).pipe(
      tap((gameEvent) => {
        if (gameEvent) {
          if (this.open) {
            this.newWhileOpen = true;
          }
          this.open = true;
        }
      })
    ).subscribe();
  }

  closeCurrentGameEvent() {
    this.open = false;
  }
}
