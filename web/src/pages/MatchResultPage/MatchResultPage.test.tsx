import { render } from '@redwoodjs/testing/web'

import MatchResultPage from './MatchResultPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MatchResultPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchResultPage />)
    }).not.toThrow()
  })
})
