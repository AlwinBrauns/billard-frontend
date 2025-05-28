import '../openapi.config.ts';
import {handlersDefault} from "./default/mocks.default";
import {handlersUsecase001} from "./usecase001/mocks.usecase001";
import {handlersUsecase002} from "./usecase002/mocks.usecase002";
import {handlersLocalHostProxy} from "./localhost/proxy.localhost";
import {handlersNetworkError} from "./networkerror/mocks.networkerror";
import {HttpHandler} from "msw";

export enum MswHandler {
  DEFAULT,
  LOCALHOST_PROXY,
  NETWORK_ERROR,
  USECASE_001,
  USECASE_002,
}

const useCaseFromLocalStorage = localStorage.getItem('useCase');

let useCase: MswHandler;

if (useCaseFromLocalStorage && useCaseFromLocalStorage in MswHandler) {
  useCase = parseInt(useCaseFromLocalStorage) as MswHandler;
} else {
  useCase = MswHandler.DEFAULT;
}

export const currentUseCase = useCase;

export const mwsHandlerToWorker: Record<MswHandler, HttpHandler[]> = {
  [MswHandler.DEFAULT]: handlersDefault,
  [MswHandler.USECASE_001]: handlersUsecase001,
  [MswHandler.USECASE_002]: handlersUsecase002,
  [MswHandler.LOCALHOST_PROXY]: handlersLocalHostProxy,
  [MswHandler.NETWORK_ERROR]: handlersNetworkError
}









