import {Component, input} from '@angular/core';
import {Game} from '../../../../api/billard/generated';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-item',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.css'
})
export class GameItemComponent {

  game = input<Game>();

  constructor(protected router: Router) {
  }
}
