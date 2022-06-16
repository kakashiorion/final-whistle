import { render } from '@redwoodjs/testing/web'

import TeamsPage from './TeamsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TeamsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamsPage />)
    }).not.toThrow()
  })
})
