import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {GameEvent, OpenAPI} from '../../../api/billard/generated';

@Injectable({
  providedIn: 'root'
})
export class GameEventsListenerService {

  constructor(private ngZone: NgZone) {
  }

  listenGameEvents(gameId: string): Observable<GameEvent> {
    return new Observable(observer => {
      const url = `${OpenAPI.BASE}/game/${gameId}/events`;
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event: MessageEvent) => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data) as GameEvent);
        });
      };

      eventSource.onerror = (error) => {
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
