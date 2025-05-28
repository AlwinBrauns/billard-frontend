import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService, UserState} from '../../auth.service';
import {worker} from '../../../mocks/browser';
import {http} from 'msw';
import {GameActions, GameStatus, HomeResponse, OpenAPI} from '../../../api/billard/generated';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeAll(async () => {
        await worker.start();
    })

    afterAll(() => {
        worker.stop();
    })

    beforeEach(() => {
        worker.resetHandlers();
    })

    beforeEach(async () => {
        const tb = TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [provideRouter(routes), provideHttpClient(withFetch())],
        })

        const authService = TestBed.inject(AuthService);
        spyOn(authService, 'userState').and.returnValue(UserState.LOGGED_IN_PAGE);

        await tb.compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load home data', async () => {
        await fixture.whenStable();
        expect(component.homeData()).toBeTruthy();
    });

    it('should show loading indicator while loading', async () => {
        component.homeDataLoading.set(true);
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('app-loading');
        expect(loading).not.toBeNull();
    });

    it('should show game cards if games are present', async () => {
        const mockHomeResponse: HomeResponse = {
            gamePage: {
                content: [{
                    id: 'game-1',
                    status: GameStatus.IN_PROGRESS,
                    createDate: new Date().toISOString(),
                    startDate: null,
                    endDate: null,
                    duration: null,
                    players: [{name: 'Alice'}, {name: 'Bob'}],
                    actions: ['PAUSE', 'RESUME', 'ABORT', 'FINISH'] as GameActions
                }],
                totalElements: 1,
                totalPages: 1,
                number: 1,
                size: 10
            },
            activeGamesOfUser: [],
            gameToListen: undefined
        };

        worker.resetHandlers(
            http.get(OpenAPI.BASE + '/home', () => {
                return new Response(JSON.stringify(mockHomeResponse), {
                    status: 200,
                    headers: {'Content-Type': 'application/json'}
                });
            })
        );

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        await fixture.whenStable();
        fixture.detectChanges();

        const cardText = fixture.nativeElement.textContent;
        expect(cardText).toContain('Alice');
        expect(cardText).toContain('Bob');
    });

});
