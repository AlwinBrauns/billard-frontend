/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameActions } from './GameActions';
import type { GameStatus } from './GameStatus';
import type { Player } from './Player';
export type Game = {
    /**
     * ID des Spiels
     */
    id: string;
    /**
     * Datum und Zeit der Spiel Erstellung
     */
    createDate?: string;
    /**
     * Datum und Zeit des Spiels
     */
    startDate?: string | null;
    /**
     * Datum und Zeit des Spiels
     */
    endDate?: string | null;
    /**
     * Dauer des Spiels in Minuten
     */
    duration?: number | null;
    winners?: Array<Player> | null;
    status: GameStatus;
    /**
     * Liste der teilnehmenden Spieler
     */
    players: Array<Player>;
    actions: GameActions;
};

