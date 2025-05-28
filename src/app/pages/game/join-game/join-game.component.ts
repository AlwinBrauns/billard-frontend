import {Component, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorResponse, Game, GameService, Player} from '../../../../api/billard/generated';
import {catchError, map, of} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import {AppHeaderComponent} from '../../../app-header/app-header.component';
import {DefaultHeaderContentComponent} from '../../../default-header-content/default-header-content.component';
import {AppFooterComponent} from '../../../app-footer/app-footer.component';
import {DefaultFooterContentComponent} from '../../../default-footer-content/default-footer-content.component';
import {AuthService} from '../../../auth.service';
import {GeneralErrorComponent} from '../../../shared/general-error/general-error.component';
import {NetworkError} from '../../../../main';

@Component({
  selector: 'app-join-game',
  imports: [
    NgIf,
    NgForOf,
    AppHeaderComponent,
    DefaultHeaderContentComponent,
    AppFooterComponent,
    DefaultFooterContentComponent,
    GeneralErrorComponent
  ],
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.css',
  host: {'class': 'page'},
})
export class JoinGameComponent {

  game: WritableSignal<null | Game> = signal(null);
  gameError: WritableSignal<ErrorResponse | null> = signal(null);
  gameErrorStatus: WritableSignal<number | null> = signal(null);
  extraState: Game | undefined;

  constructor(protected router: Router, private activeRoute: ActivatedRoute, private gameService: GameService, private auth: AuthService) {
    this.extraState = this.router.getCurrentNavigation()?.extras.state as Game | undefined;
    if (!this.extraState) {
      const game$ = gameService.getGame(
        this.activeRoute.snapshot.paramMap.get('id') as string,
      )
      game$.pipe(
        map((game: Game) => {
          this.game.set(game);
          this.gameError.set(null);
          this.gameErrorStatus.set(null);
          return game;
        }),
        catchError((error) => {
          this.gameError.set(error.body as ErrorResponse);
          this.gameErrorStatus.set(error.status);
          return of(error);
        }),
      ).subscribe();
      return;
    }
    this.game = signal(this.extraState);
    this.gameError = signal(null);
  }

  joinGame(gameId: string) {
    this.gameService.joinGame(
      gameId
    ).pipe(
      map(updatedGame => {
        this.game.set(updatedGame);
        this.gameError.set(null);
        this.gameErrorStatus.set(null);
        return updatedGame;
      }),
      catchError((error) => {
        if (error.status === 0) {
          this.gameError.set(NetworkError);
          this.gameErrorStatus.set(0);
        } else {
          this.gameError.set(error.body as ErrorResponse);
          this.gameErrorStatus.set(error.status);
        }
        return of(error);
      }),
    ).subscribe();
  }

  isAlreadyInGame(players: Array<Player>) {
    const name = this.auth.userProfile()?.firstName;
    const lastName = this.auth.userProfile()?.lastName;
    if (name && lastName) {
      return players.some((player: Player) => player.name.includes(name) && player.name.includes(lastName));
    }
    return false;
  }
}
