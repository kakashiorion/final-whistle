import { render } from '@redwoodjs/testing/web'

import RulesPage from './RulesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RulesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RulesPage />)
    }).not.toThrow()
  })
})
