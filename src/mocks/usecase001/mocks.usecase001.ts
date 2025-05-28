import {http, HttpResponse} from 'msw';
import {GameActions, GameEvent, GameStatus, HomeResponse, OpenAPI} from '../../api/billard/generated';
import {faker} from '@faker-js/faker/locale/de';

const encoder = new TextEncoder();

export const handlersUsecase001 = [
  http.get(OpenAPI.BASE + '/home', () => {
    return HttpResponse.json(<HomeResponse>{
      gamePage: {
        content: [
          {
            id: faker.string.uuid(),
            status: GameStatus.NOT_STARTED,
            createDate: faker.date.past().toISOString(),
            startDate: faker.date.past().toISOString(),
            endDate: faker.date.recent().toISOString(),
            duration: 40,
            players: [
              {
                name: faker.person.fullName()
              },
              {
                name: faker.person.fullName()
              }
            ],
            actions: <GameActions>[
              'START'
            ],
          }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 1,
        size: 10
      },
      activeGamesOfUser: [
        faker.string.uuid(),
      ],
      gameToListen: faker.string.uuid()
    })
  }),
  http.get(OpenAPI.BASE + '/game/*/events', async () => {
    const stream = new ReadableStream({
      start(controller) {

        setTimeout(() => {
          controller.enqueue(
            encoder.encode(
              `data:${JSON.stringify({
                type: 'GAME_STARTED',
                game: {
                  id: faker.string.uuid(),
                  status: GameStatus.IN_PROGRESS,
                  createDate: faker.date.past().toISOString(),
                  startDate: null,
                  endDate: null,
                  duration: null,
                  players: [
                    {
                      name: faker.person.fullName()
                    },
                    {
                      name: faker.person.fullName({firstName: 'Mustermann', lastName: 'Msw'})
                    }
                  ],
                  actions: [
                    'PAUSE',
                    'RESUME',
                    'ABORT',
                    'FINISH'
                  ] as GameActions
                }
              } as GameEvent)}\n\n`
            )
          );
          setTimeout(() => {
            controller.enqueue(
              encoder.encode(
                `data:${JSON.stringify({
                  type: 'GAME_STARTED',
                  game: {
                    id: faker.string.uuid(),
                    status: GameStatus.IN_PROGRESS,
                    createDate: faker.date.past().toISOString(),
                    startDate: null,
                    endDate: null,
                    duration: null,
                    players: [
                      {
                        name: faker.person.fullName()
                      },
                      {
                        name: faker.person.fullName({firstName: 'Mustermann', lastName: 'Msw'})
                      }
                    ],
                    actions: [
                      'PAUSE',
                      'RESUME',
                      'ABORT',
                      'FINISH'
                    ] as GameActions
                  }
                } as GameEvent)}\n\n`
              )
            );
          }, 6000)
        }, 2000)
        setTimeout(() => {
          controller.close();
        }, 10000)
      },
    });

    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      }
    });
  }),
]
