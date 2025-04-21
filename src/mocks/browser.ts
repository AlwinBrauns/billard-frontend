import {setupWorker} from 'msw/browser';
import {handlers, handlersUsecase001, handlersUsecase002} from './handlers';
import {HttpHandler} from 'msw';

export enum MswHandler {
  DEFAULT,
  USECASE_001,
  USECASE_002,
}

const useCaseFromLocalStorage = localStorage.getItem('useCase');

let useCase: MswHandler;

if(useCaseFromLocalStorage && useCaseFromLocalStorage in MswHandler) {
  useCase = parseInt(useCaseFromLocalStorage) as MswHandler;
} else {
  useCase = MswHandler.DEFAULT;
}

export const currentUseCase = useCase;

const mwsHandlerToWorker: Record<MswHandler, HttpHandler[]> = {
  [MswHandler.DEFAULT]: handlers,
  [MswHandler.USECASE_001]: handlersUsecase001,
  [MswHandler.USECASE_002]: handlersUsecase002
}

export const worker = setupWorker(
  ...mwsHandlerToWorker[useCase]
);
