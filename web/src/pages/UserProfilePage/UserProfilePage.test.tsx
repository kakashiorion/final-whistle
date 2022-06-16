import { render } from '@redwoodjs/testing/web'

import UserProfilePage from './UserProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserProfilePage />)
    }).not.toThrow()
  })
})
