import {Component, input, model} from '@angular/core';
import {HomeResponse} from '../../../../api/billard/generated';
import {GameItemComponent} from '../game-item/game-item.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [
    GameItemComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {

  homeResponse = input<HomeResponse | null>(null);
  pageNumber = model<number>(1);
}
