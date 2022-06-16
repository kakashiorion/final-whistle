import { render } from '@redwoodjs/testing/web'

import MatchesPage from './MatchesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MatchesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchesPage />)
    }).not.toThrow()
  })
})
