import {http, HttpResponse} from 'msw';
import {ErrorResponse, Game, GameActions, GameStatus, HomeResponse, OpenAPI} from '../../api/billard/generated';
import {faker} from '@faker-js/faker/locale/de';
import {KeycloakProfile} from 'keycloak-js';

export const handlersDefault = [
  http.get('https://auth.bybrauns.com/realms/bybrauns/account', () => {
    return HttpResponse.json(
      <KeycloakProfile>{
        "id": "2000cdcd-4888-4abe-be36-7038777d3058",
        "username": "msw",
        "firstName": "Mister Msw",
        "lastName": "Muster",
        "email": "mocked@test.de",
        "emailVerified": true,
      }
    )
  }),
  http.post(OpenAPI.BASE + '/game/*/join', async ({request}) => {
    const bearerToken = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!bearerToken) {
      return HttpResponse.json(<ErrorResponse>{
        message: 'Unauthorized'
      }, {
        status: 401
      });
    }
    return HttpResponse.json(<Game>{
      id: faker.string.uuid(),
      status: GameStatus.NOT_STARTED,
      createDate: faker.date.past().toISOString(),
      startDate: null,
      endDate: null,
      duration: null,
      players: [
        {
          name: faker.person.fullName()
        },
        {
          name: faker.person.fullName({firstName: 'Mustermann', lastName: 'Msw', sex: 'male'})
        }
      ],
      actions: <GameActions>[
        "START"
      ]
    });
  }),
  http.get(OpenAPI.BASE + '/game/*', async () => {
    return HttpResponse.json(<Game>{
      id: faker.string.uuid(),
      status: GameStatus.NOT_STARTED,
      createDate: faker.date.past().toISOString(),
      startDate: null,
      endDate: null,
      duration: null,
      players: [
        {
          name: faker.person.fullName()
        }
      ],
      actions: <GameActions>[
        "START"
      ]
    });
  }),
  http.get(OpenAPI.BASE + '/home', async ({request}) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const contentFirstPage = [
      {
        id: faker.string.uuid(),
        status: GameStatus.NOT_STARTED,
        createDate: faker.date.past().toISOString(),
        startDate: null,
        endDate: null,
        duration: null,
        players: [
          {
            name: faker.person.fullName()
          }
        ],
        actions: <GameActions>[
          "START"
        ]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.NOT_STARTED,
        createDate: faker.date.past().toISOString(),
        startDate: null,
        endDate: null,
        duration: null,
        players: [],
        actions: <GameActions>[
          "START"
        ]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      },
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      }
    ];
    const contentSecondPage = [
      {
        id: faker.string.uuid(),
        status: GameStatus.FINISHED,
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
        actions: <GameActions>[]
      }
    ];
    const url = new URL(request.url);
    return HttpResponse.json(<HomeResponse>{
      gamePage: {
        content: url.searchParams.get('page') === '1' ? contentFirstPage : contentSecondPage,
        totalElements: 11,
        totalPages: 2,
        number: url.searchParams.get('page') ?? 1,
        size: 10
      },
      activeGamesOfUser: [
        faker.string.uuid(),
      ],
      gameToListen: faker.string.uuid()
    })
  })
]
