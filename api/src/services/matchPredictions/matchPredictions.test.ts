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
        matchId: scenario.matchPrediction.two.matchId,
        predictedScoringPlayersOfTeam1: 4456786,
        predictedScoringPlayersOfTeam2: 4140043,
        updatedAt: '2022-07-11T16:18:04Z',
      },
    })

    expect(result.userId).toEqual(scenario.matchPrediction.two.userId)
    expect(result.matchId).toEqual(scenario.matchPrediction.two.matchId)
    expect(result.predictedScoringPlayersOfTeam1).toEqual(4456786)
    expect(result.predictedScoringPlayersOfTeam2).toEqual(4140043)
    expect(result.updatedAt).toEqual('2022-07-11T16:18:04Z')
  })

  scenario('updates a matchPrediction', async (scenario: StandardScenario) => {
    const original = await matchPrediction({
      id: scenario.matchPrediction.one.id,
    })
    const result = await updateMatchPrediction({
      id: original.id,
      input: { predictedScoringPlayersOfTeam1: 1322382 },
    })

    expect(result.predictedScoringPlayersOfTeam1).toEqual(1322382)
  })

  scenario('deletes a matchPrediction', async (scenario: StandardScenario) => {
    const original = await deleteMatchPrediction({
      id: scenario.matchPrediction.one.id,
    })
    const result = await matchPrediction({ id: original.id })

    expect(result).toEqual(null)
  })
})
