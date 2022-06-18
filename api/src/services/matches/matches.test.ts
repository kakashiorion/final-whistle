import {
  matches,
  match,
  createMatch,
  updateMatch,
  deleteMatch,
} from './matches'
import type { StandardScenario } from './matches.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('matches', () => {
  scenario('returns all matches', async (scenario: StandardScenario) => {
    const result = await matches()

    expect(result.length).toEqual(Object.keys(scenario.match).length)
  })

  scenario('returns a single match', async (scenario: StandardScenario) => {
    const result = await match({ id: scenario.match.one.id })

    expect(result).toEqual(scenario.match.one)
  })

  scenario('creates a match', async (scenario: StandardScenario) => {
    const result = await createMatch({
      input: {
        location: 'String',
        matchDate: '2022-06-18T19:07:24Z',
        round: 'String',
        tournamentId: scenario.match.two.tournamentId,
        updatedAt: '2022-06-18T19:07:24Z',
        maxWagerLimit: 6740476,
      },
    })

    expect(result.location).toEqual('String')
    expect(result.matchDate).toEqual('2022-06-18T19:07:24Z')
    expect(result.round).toEqual('String')
    expect(result.tournamentId).toEqual(scenario.match.two.tournamentId)
    expect(result.updatedAt).toEqual('2022-06-18T19:07:24Z')
    expect(result.maxWagerLimit).toEqual(6740476)
  })

  scenario('updates a match', async (scenario: StandardScenario) => {
    const original = await match({ id: scenario.match.one.id })
    const result = await updateMatch({
      id: original.id,
      input: { location: 'String2' },
    })

    expect(result.location).toEqual('String2')
  })

  scenario('deletes a match', async (scenario: StandardScenario) => {
    const original = await deleteMatch({ id: scenario.match.one.id })
    const result = await match({ id: original.id })

    expect(result).toEqual(null)
  })
})
