import {
  matchPredictions,
  matchPrediction,
  createMatchPrediction,
  updateMatchPrediction,
  deleteMatchPrediction,
} from './matchPredictions'
import type { StandardScenario } from './matchPredictions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('matchPredictions', () => {
  scenario(
    'returns all matchPredictions',
    async (scenario: StandardScenario) => {
      const result = await matchPredictions()

      expect(result.length).toEqual(
        Object.keys(scenario.matchPrediction).length
      )
    }
  )

  scenario(
    'returns a single matchPrediction',
    async (scenario: StandardScenario) => {
      const result = await matchPrediction({
        id: scenario.matchPrediction.one.id,
      })

      expect(result).toEqual(scenario.matchPrediction.one)
    }
  )

  scenario('creates a matchPrediction', async (scenario: StandardScenario) => {
    const result = await createMatchPrediction({
      input: {
        userId: scenario.matchPrediction.two.userId,
        matchId: 6646001,
        predictedScoringPlayersOfTeam1: 5077270,
        predictedScoringPlayersOfTeam2: 7927986,
        updatedAt: '2022-06-16T16:34:47Z',
      },
    })

    expect(result.userId).toEqual(scenario.matchPrediction.two.userId)
    expect(result.matchId).toEqual(6646001)
    expect(result.predictedScoringPlayersOfTeam1).toEqual(5077270)
    expect(result.predictedScoringPlayersOfTeam2).toEqual(7927986)
    expect(result.updatedAt).toEqual('2022-06-16T16:34:47Z')
  })

  scenario('updates a matchPrediction', async (scenario: StandardScenario) => {
    const original = await matchPrediction({
      id: scenario.matchPrediction.one.id,
    })
    const result = await updateMatchPrediction({
      id: original.id,
      input: { matchId: 7469409 },
    })

    expect(result.matchId).toEqual(7469409)
  })

  scenario('deletes a matchPrediction', async (scenario: StandardScenario) => {
    const original = await deleteMatchPrediction({
      id: scenario.matchPrediction.one.id,
    })
    const result = await matchPrediction({ id: original.id })

    expect(result).toEqual(null)
  })
})
