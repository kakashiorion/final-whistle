import type { FindUsers } from 'types/graphql'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { FieldError, Form, SubmitHandler, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'
import logo from 'public/Main 2.png'
import { SecondarySkewedButton } from '../Buttons/SkewedButton/SecondarySkewedButton'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'

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
      points
    }
  }
`

export const Loading = () => (
  <div className="bg-[url('/public/userSetup.avif')] bg-black-1 bg-cover bg-blend-overlay flex justify-center items-center w-full px-4 md:px-8 py-4 md:py-8 h-screen">
    <img className="h-1/4 animate-spin" src={logo} alt="FW logo" />
  </div>
)

export const Success = ({ users }: CellSuccessProps<FindUsers>) => {
  const { currentUser, reauthenticate } = useAuth()
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
    if (currentUser.username) {
      navigate(routes.home())
    }
  }, [currentUser.username])

  interface FormValues {
    username: string
  }
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (users.some((user) => user.username === data.username)) {
      //username already exists.. try another
      toast.error('Username already taken.. Try something different')
    } else {
      //Update username and give user tournament points
      const tournamentInitialPoints = 1000
      updateUser({
        variables: {
          id: currentUser.id,
          input: { username: data.username, points: tournamentInitialPoints },
        },
      })
    }
  }

  return (
    <div className="bg-[url('/public/userSetup.avif')] bg-black-1 bg-cover bg-blend-overlay flex justify-center items-center w-full px-4 md:px-8 py-4 md:py-8 h-screen">
      <div className="flex flex-col h-full w-full md:w-1/3 gap-3 md:gap-4 items-center justify-center">
        <img className="max-w-[80px] max-h-20" src={logo} alt="FW logo" />
        <p className="text-green-normal text-xl font-bold md:text-2xl text-center">
          Account crearted successfully!
        </p>
        <p className="text-white-2 mt-8 text-sm md:text-base text-center">
          But before you can start playing, just one last thing:
        </p>
        <p className="text-secondary-light text-lg md:text-xl text-center">
          WHAT NAME WOULD WE PUT ON THE TROPHY?
        </p>
        <Form
          onSubmit={onSubmit}
          className=" flex flex-col gap-3 md:gap-4 items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <TextField
              className="text-primary-dark placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-secondary-normal text-md md:text-lg"
              name="username"
              placeholder="Choose a username"
              errorClassName="text-red-light placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-light text-lg md:text-xl"
              validation={{
                required: { value: true, message: 'Username is required' },
                maxLength: { value: 20, message: 'Max 20 characters allowed' },
              }}
            />
            <FieldError
              className="text-xs md:text-sm text-red-light"
              name="username"
            />
          </div>
          <SecondarySkewedButton label="DONE" />
        </Form>
      </div>
    </div>
  )
}
