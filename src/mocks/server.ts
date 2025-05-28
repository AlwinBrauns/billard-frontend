import {setupServer} from 'msw/node';
import {currentUseCase, mwsHandlerToWorker} from './handlers';

export const service = setupServer(
  ...mwsHandlerToWorker[currentUseCase]
);
