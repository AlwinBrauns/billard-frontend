import {http, HttpResponse} from 'msw';
import {OpenAPI} from '../../api/billard/generated';

export const handlersNetworkError = [
  http.all(OpenAPI.BASE + '/*', async () => {
    return HttpResponse.error();
  }),
]
