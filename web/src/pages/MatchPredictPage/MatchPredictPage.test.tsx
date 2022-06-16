import { render } from '@redwoodjs/testing/web'

import MatchPredictPage from './MatchPredictPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MatchPredictPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchPredictPage />)
    }).not.toThrow()
  })
})
