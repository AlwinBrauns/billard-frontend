import {Component, OnInit, Signal, signal} from '@angular/core';
import {AppHeaderComponent} from '../../app-header/app-header.component';
import {AppFooterComponent} from '../../app-footer/app-footer.component';
import {DefaultHeaderContentComponent} from '../../default-header-content/default-header-content.component';
import {DefaultFooterContentComponent} from '../../default-footer-content/default-footer-content.component';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {ErrorResponse, GameEvent, HomeResponse, HomeService} from '../../../api/billard/generated';
import {GeneralErrorComponent} from '../../shared/general-error/general-error.component';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {FormsModule} from '@angular/forms';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs/operators';
import {GameListComponent} from './game-list/game-list.component';
import {AuthService, UserState} from '../../auth.service';
import {NetworkError} from '../../../main';
import {GameEventsListenerService} from '../game/game-events-listener.service';
import {Router} from '@angular/router';
import {GameEventModalComponent} from './game-event-modal/game-event-modal.component';

@Component({
    selector: 'app-home',
    imports: [
        AppHeaderComponent,
        AppFooterComponent,
        DefaultHeaderContentComponent,
        DefaultFooterContentComponent,
        NgIf,
        GeneralErrorComponent,
        LoadingComponent,
        FormsModule,
        GameListComponent,
        GameEventModalComponent,
        AsyncPipe
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    host: {'class': 'page'},
})
export class HomeComponent implements OnInit {
    pageNumber = signal<number>(1);
    pageSize = 10;

    homeData: Signal<HomeResponse | null>;
    homeDataError: Signal<ErrorResponse | null>;
    homeDataLoading = signal<boolean>(false);
    gameEvents: Observable<null | GameEvent> = of(null);

    constructor(private homeService: HomeService, protected authService: AuthService, private gameEventService: GameEventsListenerService, protected router: Router) {
        const _homeData$ = this.getHomeDataObservable()
        this.homeData = this.toHomeDataSignal(_homeData$);
        this.homeDataError = this.toHomeDataErrorSignal(_homeData$);
    }

    private getHomeDataObservable() {
        return toObservable(this.pageNumber).pipe(
            tap(() => {
                this.homeDataLoading.set(true);
            }),
            switchMap(page => this.homeService.getHome(page, this.pageSize).pipe(
                    tap(() => this.homeDataLoading.set(false)),
                    catchError(error => {
                        console.error('Error fetching home data:', error);
                        this.homeDataLoading.set(false);
                        throw error;
                    }),
                ),
            ),
        );
    }

    private toHomeDataSignal(_homeData$: Observable<HomeResponse | null>) {
        return toSignal(_homeData$.pipe(
            tap((homeData) => {
                if (homeData?.gameToListen) {
                    this.gameEvents = this.gameEventService.listenGameEvents(homeData.gameToListen)
                        .pipe(
                            tap((gameEvent) => {
                                console.log('Game event:', gameEvent);
                            }),
                            catchError((error) => {
                                console.error('Error listening to game events:', error);
                                return of(null);
                            }),
                        );
                } else {
                    this.gameEvents = of(null);
                }
            }),
            catchError(() => of(null)),
        ), {initialValue: null});
    }

    private toHomeDataErrorSignal(_homeData$: Observable<HomeResponse | null>) {
        return toSignal(_homeData$.pipe(
            map(() => null),
            catchError((error) => {
                if (error.status === 0) {
                    return of(NetworkError)
                }
                return of(error.body as ErrorResponse)
            }),
        ), {initialValue: null});
    }

    ngOnInit(): void {
    }

    protected readonly UserState = UserState;
}
