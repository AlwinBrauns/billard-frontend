import {TestBed} from '@angular/core/testing';

import {GameEventsListenerService} from './game-events-listener.service';

describe('GameEventsListenerService', () => {
  let service: GameEventsListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEventsListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
