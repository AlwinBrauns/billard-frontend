import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinGameComponent} from './join-game.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../../app.routes';
import {provideHttpClient} from '@angular/common/http';

describe('JoinGameComponent', () => {
    let component: JoinGameComponent;
    let fixture: ComponentFixture<JoinGameComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JoinGameComponent],
            providers: [provideHttpClientTesting(), provideRouter(routes), provideHttpClient()],
        })
            .compileComponents();

        fixture = TestBed.createComponent(JoinGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
