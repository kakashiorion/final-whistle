import { render } from '@redwoodjs/testing/web'

import LeaderboardPage from './LeaderboardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LeaderboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeaderboardPage />)
    }).not.toThrow()
  })
})
