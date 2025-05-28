/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Game } from './Game';
export type GameEvent = {
    type: GameEvent.type;
    game: Game;
    extra?: Record<string, any>;
};
export namespace GameEvent {
    export enum type {
        GAME_STARTED = 'GAME_STARTED',
        GAME_ABORTED = 'GAME_ABORTED',
        GAME_PAUSED = 'GAME_PAUSED',
        GAME_RESUMED = 'GAME_RESUMED',
        GAME_FINISHED = 'GAME_FINISHED',
        PLAYER_ADDED = 'PLAYER_ADDED',
        PLAYER_REMOVED = 'PLAYER_REMOVED',
    }
}

