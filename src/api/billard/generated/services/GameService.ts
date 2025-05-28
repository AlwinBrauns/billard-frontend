/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Game } from '../models/Game';
import type { GameEvent } from '../models/GameEvent';
import type { PlayerInput } from '../models/PlayerInput';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(public readonly http: HttpClient) {}
    /**
     * Neues Spiel erstellen
     * Erstellt ein neues Billard-Spiel mit den angegebenen Spielern
     * @param requestBody
     * @returns Game Spiel erfolgreich erstellt
     * @throws ApiError
     */
    public createGame(
        requestBody: {
            players?: Array<PlayerInput>;
        },
    ): Observable<Game> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/game',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Game Action
     * Führt eine Aktion für ein bestimmtes Spiel aus
     * @param gameId ID des Spiels
     * @param action Auszuführende Aktion
     * @returns Game Aktion erfolgreich ausgeführt
     * @throws ApiError
     */
    public gameAction(
        gameId: string,
        action: 'START' | 'ABORT' | 'PAUSE' | 'RESUME' | 'FINISH',
    ): Observable<Game> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/game/{gameId}/{action}',
            path: {
                'gameId': gameId,
                'action': action,
            },
            errors: {
                404: `Ressource nicht gefunden`,
                409: `Serverfehler`,
            },
        });
    }
    /**
     * Spielereignisse
     * Abonnieren Sie Ereignisse für ein bestimmtes Spiel. Dazu gehört der Spielstand, beigetretende Spieler und andere Spielereignisse.
     * @param gameId ID des Spiels
     * @returns GameEvent Erfolgreich verbunden und empfängt Ereignisse
     * @throws ApiError
     */
    public subscribeToGameEvents(
        gameId: string,
    ): Observable<GameEvent> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/game/{gameId}/events',
            path: {
                'gameId': gameId,
            },
        });
    }
    /**
     * Spieler zu einem Spiel hinzufügen
     * Fügt einen Spieler zu einem bestehenden Spiel hinzu
     * @param gameId ID des Spiels
     * @returns Game Spieler erfolgreich hinzugefügt
     * @throws ApiError
     */
    public joinGame(
        gameId: string,
    ): Observable<Game> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/game/{gameId}/join',
            path: {
                'gameId': gameId,
            },
            errors: {
                401: `Serverfehler`,
                404: `Ressource nicht gefunden`,
                409: `Serverfehler`,
            },
        });
    }
    /**
     * Spiel abrufen
     * Ruft die Details eines bestimmten Spiels ab
     * @param gameId ID des Spiels
     * @returns Game Spieldetails erfolgreich abgerufen
     * @throws ApiError
     */
    public getGame(
        gameId: string,
    ): Observable<Game> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/game/{gameId}',
            path: {
                'gameId': gameId,
            },
        });
    }
}
