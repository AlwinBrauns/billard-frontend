import '../../openapi.config.ts';
import {http, HttpResponse} from 'msw';
import {ErrorResponse, OpenAPI} from '../../api/billard/generated';

export const handlersUsecase002 = [
  http.get(OpenAPI.BASE + '/home', () => {
    return HttpResponse.json(
      <ErrorResponse>{
        message: 'Internal Server Error'
      },
      {
        status: 500
      }
    )
  })
]
