/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { HomeResponse } from '../models/HomeResponse';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(public readonly http: HttpClient) {}
    /**
     * Home
     * Zeigt aktuelle Spiele und deren Status an
     * @param page Seitennummer für die Paginierung
     * @param size Anzahl der Spiele pro Seite
     * @returns HomeResponse Liste der aktuellen Spiele erfolgreich abgerufen
     * @throws ApiError
     */
    public getHome(
        page?: number,
        size: number = 10,
    ): Observable<HomeResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/home',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
}
