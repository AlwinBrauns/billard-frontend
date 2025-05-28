import {setupWorker} from 'msw/browser';
import {currentUseCase, mwsHandlerToWorker} from './handlers';

export const worker = setupWorker(
  ...mwsHandlerToWorker[currentUseCase]
);
