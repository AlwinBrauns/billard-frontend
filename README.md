# Billard

Ein Beispielprojekt, das zeigt, wie man [MSW.js](https://mswjs.io/) mit [OpenAPI](https://swagger.io/specification/) und [Angular](https://angular.io/) integriert.

Tipp: benutze [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock) für OpenAPI.

## Wichtige Ordner

- **src/mocks**: Konfiguration und Handler für MSW.js.
- **src/api**, **src/assets**: OpenAPI-Spezifikation und generierte Typen. 

## Skripte

- `npm run generate-openapi`: Generiert Typen und Endpunkte aus der OpenAPI-Spezifikation.
- `ng serve`: Startet die Angular-Anwendung.
- `ng test`: Startet die Karma/Jasmine Tests.
- `npx msw init ./src --save`: Generiert mockServiceWorker.js

## Einbinden in Angular

1. **angular.json** anpassen: `"src/mockServiceWorker.js"` für development und test bei assets hinzufügen
2. **src/mocks** mocks mit handlern einbinden
3. **main.ts** anpassen z.B. so:
```typescript
// Tests should manually import the worker
async function prepareApp() {
if (isDevMode() && !(window as any).__karma__) {
const {worker} = await import('./mocks/browser');
// @ts-ignore
window.__dev = {worker: worker};
return worker.start();
}

return Promise.resolve();
}

prepareApp().then(() => {
bootstrapApplication(AppComponent, appConfig)
.catch((err) => console.error(err));
})
```

## Ressourcen

- [MSW.js Dokumentation](https://mswjs.io/docs)
- [OpenAPI Spezifikation](https://swagger.io/specification/)
- [Angular Dokumentation](https://angular.io/docs)
