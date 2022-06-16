import {
  tournaments,
  tournament,
  createTournament,
  updateTournament,
  deleteTournament,
} from './tournaments'
import type { StandardScenario } from './tournaments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tournaments', () => {
  scenario('returns all tournaments', async (scenario: StandardScenario) => {
    const result = await tournaments()

    expect(result.length).toEqual(Object.keys(scenario.tournament).length)
  })

  scenario(
    'returns a single tournament',
    async (scenario: StandardScenario) => {
      const result = await tournament({ id: scenario.tournament.one.id })

      expect(result).toEqual(scenario.tournament.one)
    }
  )

  scenario('creates a tournament', async () => {
    const result = await createTournament({
      input: {
        name: 'String',
        startDate: '2022-06-16T16:28:59Z',
        endDate: '2022-06-16T16:28:59Z',
        updatedAt: '2022-06-16T16:28:59Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.startDate).toEqual('2022-06-16T16:28:59Z')
    expect(result.endDate).toEqual('2022-06-16T16:28:59Z')
    expect(result.updatedAt).toEqual('2022-06-16T16:28:59Z')
  })

  scenario('updates a tournament', async (scenario: StandardScenario) => {
    const original = await tournament({ id: scenario.tournament.one.id })
    const result = await updateTournament({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a tournament', async (scenario: StandardScenario) => {
    const original = await deleteTournament({ id: scenario.tournament.one.id })
    const result = await tournament({ id: original.id })

    expect(result).toEqual(null)
  })
})
