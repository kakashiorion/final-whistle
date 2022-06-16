import { render } from '@redwoodjs/testing/web'

import UserSetupPage from './UserSetupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserSetupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserSetupPage />)
    }).not.toThrow()
  })
})
