import {
  teamsInMatches,
  teamsInMatch,
  createTeamsInMatch,
  updateTeamsInMatch,
  deleteTeamsInMatch,
} from './teamsInMatches'
import type { StandardScenario } from './teamsInMatches.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('teamsInMatches', () => {
  scenario('returns all teamsInMatches', async (scenario: StandardScenario) => {
    const result = await teamsInMatches()

    expect(result.length).toEqual(Object.keys(scenario.teamsInMatch).length)
  })

  scenario(
    'returns a single teamsInMatch',
    async (scenario: StandardScenario) => {
      const result = await teamsInMatch({ id: scenario.teamsInMatch.one.id })

      expect(result).toEqual(scenario.teamsInMatch.one)
    }
  )

  scenario('creates a teamsInMatch', async (scenario: StandardScenario) => {
    const result = await createTeamsInMatch({
      input: {
        matchId: scenario.teamsInMatch.two.matchId,
        teamId: scenario.teamsInMatch.two.teamId,
        scoringPlayers: 1030268,
        updatedAt: '2022-06-16T16:32:32Z',
      },
    })

    expect(result.matchId).toEqual(scenario.teamsInMatch.two.matchId)
    expect(result.teamId).toEqual(scenario.teamsInMatch.two.teamId)
    expect(result.scoringPlayers).toEqual(1030268)
    expect(result.updatedAt).toEqual('2022-06-16T16:32:32Z')
  })

  scenario('updates a teamsInMatch', async (scenario: StandardScenario) => {
    const original = await teamsInMatch({ id: scenario.teamsInMatch.one.id })
    const result = await updateTeamsInMatch({
      id: original.id,
      input: { scoringPlayers: 7271619 },
    })

    expect(result.scoringPlayers).toEqual(7271619)
  })

  scenario('deletes a teamsInMatch', async (scenario: StandardScenario) => {
    const original = await deleteTeamsInMatch({
      id: scenario.teamsInMatch.one.id,
    })
    const result = await teamsInMatch({ id: original.id })

    expect(result).toEqual(null)
  })
})
