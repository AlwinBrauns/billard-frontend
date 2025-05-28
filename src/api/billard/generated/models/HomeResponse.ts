/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GamePage } from './GamePage';
export type HomeResponse = {
    gamePage: GamePage;
    activeGamesOfUser?: Array<string>;
    /**
     * ID des Spiels, das der Benutzer abonniert hat oder abonnieren möchte
     */
    gameToListen?: string;
};

