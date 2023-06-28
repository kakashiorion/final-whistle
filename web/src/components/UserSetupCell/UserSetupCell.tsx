import { useEffect, useState } from 'react'

import logo from 'public/Main 2.png'
import type { FindUsers } from 'types/graphql'

import { FieldError, Form, SubmitHandler, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import {
  CurrentTournamentInitialCoins,
  ErrorFieldClassName,
  FormClassName,
  PageContentClassName,
  SignupTextInputErrorClassName,
  SignupTextInputFieldClassName,
} from 'src/utils'

import { SecondarySkewedButton } from '../Buttons/SkewedButton/SecondarySkewedButton'

export const QUERY = gql`
  query FindAllUsers {
    users {
      id
      username
    }
  }
`

const UPDATE_USER_NAME_MUTATION = gql`
  mutation UpdateUserNameMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      coins
    }
  }
`

export const Loading = () => (
  <div className="bg-[url('/public/userSetup.avif')] bg-black-1/95 bg-cover bg-blend-overlay flex justify-center items-center w-full px-4 md:px-8 py-12 md:py-16 h-screen">
    <img className="h-1/4 animate-spin" src={logo} alt="FW logo" />
  </div>
)

export const Success = ({ users }: CellSuccessProps<FindUsers>) => {
  const { currentUser, reauthenticate } = useAuth()
  const [loading, setLoading] = useState(false)
  const [updateUser] = useMutation(UPDATE_USER_NAME_MUTATION, {
    onCompleted: () => {
      toast.success('All set!')
      reauthenticate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (currentUser.username && currentUser.coins) {
      navigate(routes.home())
    }
  }, [currentUser.username, currentUser.coins])

  interface FormValues {
    username: string
  }
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    if (users.some((user) => user.username === data.username)) {
      //username already exists.. try another
      toast.error('Username already taken.. Try something different')
    } else {
      //Update username and give initial tournament coins and 0 points
      updateUser({
        variables: {
          id: currentUser.id,
          input: {
            username: data.username,
            coins: CurrentTournamentInitialCoins,
            points: 0,
          },
        },
      })
    }
    setLoading(false)
  }

  return (
    <div className="bg-[url('/public/userSetup.avif')] bg-black-1/95 bg-cover bg-blend-overlay flex justify-center items-center w-full px-4 md:px-8 py-12 md:py-16 h-screen">
      <div className={PageContentClassName}>
        <img className="h-16 md:h-20" src={logo} alt="FW logo" />
        <p className="text-green-light text-lg md:text-2xl text-center">
          Account crearted successfully!
        </p>
        <p className="text-white-3 text-xs md:text-sm text-center">
          Before you can start playing, just one last thing:
        </p>
        <p className="text-secondary-light text-lg md:text-2xl text-center">
          Enter your username that will be displayed on the leaderboard
        </p>
        <Form onSubmit={onSubmit} className={FormClassName}>
          <div className="flex flex-col items-center justify-center">
            <TextField
              className={SignupTextInputFieldClassName}
              name="username"
              placeholder="Choose a username"
              errorClassName={SignupTextInputErrorClassName}
              validation={{
                required: { value: true, message: 'Username is required' },
                maxLength: { value: 15, message: 'Max 15 characters allowed' },
                minLength: { value: 5, message: 'Min 5 characters required' },
              }}
            />
            <FieldError className={ErrorFieldClassName} name="username" />
          </div>
          <SecondarySkewedButton
            label={loading ? '... Please Wait' : 'START PLAYING'}
          />
        </Form>
      </div>
    </div>
  )
}
