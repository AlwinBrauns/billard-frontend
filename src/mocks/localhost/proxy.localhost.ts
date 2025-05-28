import {bypass, http, HttpResponse} from 'msw';
import {OpenAPI} from '../../api/billard/generated';

export const handlersLocalHostProxy = [
  http.all(OpenAPI.BASE + '/*', async ({request}) => {
    const url = new URL(request.url)
    url.protocol = 'http:';
    url.host = 'localhost:8080';
    try {
      return await fetch(url, bypass(request))
    } catch (e) {
      console.error(e)
      return HttpResponse.error();
    }
  }),
]
