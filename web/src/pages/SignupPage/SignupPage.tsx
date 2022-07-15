import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import logo from 'public/Main 2.png'
import {
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
  TextField,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { useAuth } from '@redwoodjs/auth'
import { PrimaryRoundedButtonOutlined } from 'src/components/Buttons/RoundedButton/PrimaryRoundedButton'
import { SecondarySkewedButton } from 'src/components/Buttons/SkewedButton/SecondarySkewedButton'
import { useState } from 'react'

const SignupPage = () => {
  return (
    <>
      <MetaTags
        title="Signup"
        description="Signup page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <SignupContent />
    </>
  )
}

export default SignupPage

const SignupContent = () => {
  return (
    <div className=" bg-[url('/public/signupBG.webp')] bg-black-2 bg-cover bg-blend-overlay flex justify-end items-center w-full px-4 md:px-8 py-4 md:py-8 h-screen">
      <div className="w-full md:w-1/2 rounded-3xl flex flex-col gap-6 md:gap-8 items-center justify-center px-4 py-16">
        <img
          className="max-w-[80px] max-h-20 animate-spin"
          src={logo}
          alt="FW logo"
        />
        <p className="text-lg md:text-xl text-white-2 w-full text-center">
          Start your journey with just an email
        </p>
        <SignupForm />
        <LoginBlock />
      </div>
    </div>
  )
}

interface FormValues {
  email: string
  password: string
}
const SignupForm = () => {
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    const response = await signUp({
      username: data.email,
      password: data.password,
    })
    setLoading(false)
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome!')
      navigate(routes.userSetup(), { replace: true })
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-3 md:gap-4"
    >
      <div className="items-center flex flex-col">
        <TextField
          placeholder="Enter your email"
          inputMode="email"
          className="text-primary-dark placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-secondary-normal text-base md:text-lg"
          name="email"
          errorClassName="text-red-normal placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-normal text-lg md:text-xl"
          validation={{
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError
          className="text-xs md:text-sm text-red-normal"
          name="email"
        />
      </div>
      <div className="items-center flex flex-col">
        <PasswordField
          placeholder="Choose a password"
          hidden={true}
          className="text-primary-dark placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-secondary-normal text-base md:text-lg"
          name="password"
          errorClassName="text-red-normal placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-normal text-lg md:text-xl"
          validation={{
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: { value: 8, message: 'Minimum 8 characters' },
          }}
        />
        <FieldError
          className="text-xs md:text-sm text-red-normal"
          name="password"
        />
      </div>
      <SecondarySkewedButton
        label={loading ? '... Please Wait' : 'CREATE ACCOUNT'}
      />
    </Form>
  )
}

const LoginBlock = () => {
  const navigateToLoginPage = () => {
    navigate(routes.login())
  }
  const loginText = 'Already have an account?'

  return (
    <div className="gap-2 flex flex-col items-center justify-center">
      <p className="text-base md:text-lg text-center whitespace-nowrap text-primary-normal font-bold">
        {loginText}
      </p>
      <PrimaryRoundedButtonOutlined
        label="LOGIN NOW!"
        onClick={navigateToLoginPage}
      />
    </div>
  )
}
