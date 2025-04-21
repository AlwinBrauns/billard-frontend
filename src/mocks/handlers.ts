import {http, HttpResponse} from 'msw';
import {faker} from '@faker-js/faker/locale/de';
import {GameStatus, GameActions, HomeResponse, ErrorResponse, Game} from '../api/billard/generated';

export const handlers = [
  http.get('https://billard.bybrauns.com/api/v1/home', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return HttpResponse.json(<HomeResponse>[
      {
        game: <Game>{
          id: faker.string.uuid(),
          status: GameStatus.NOT_STARTED,
          createDate: faker.date.recent().toISOString(),
          players: [
            {
              name: faker.person.fullName()
            },
            {
              name: faker.person.fullName()
            }
          ],
          actions: <GameActions>[
            "START"
          ]
        }
      },
      {
        game: <Game>{
          id: faker.string.uuid(),
          status: GameStatus.IN_PROGRESS,
          createDate: faker.date.past().toISOString(),
          startDate: faker.date.recent().toISOString(),
          players: [
            {
              name: faker.person.fullName()
            },
            {
              name: faker.person.fullName()
            }
          ],
          actions: <GameActions>[
            "PAUSE",
            "ABORT",
            "FINISH"
          ]
        }
      }
    ])
  })
]

export const handlersUsecase001 = [
  http.get('https://billard.bybrauns.com/api/v1/home', () => {
    return HttpResponse.json(<HomeResponse>[
      {
        game: <Game>{
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
      },
    ])
  })
]

export const handlersUsecase002 = [
  http.get('https://billard.bybrauns.com/api/v1/home', () => {
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

