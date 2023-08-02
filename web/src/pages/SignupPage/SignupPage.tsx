import { useState } from 'react'

import logo from 'public/Main 2.png'

import {
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
  TextField,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import { SecondarySkewedButton } from 'src/components/Buttons/SkewedButton/SecondarySkewedButton'
import {
  ErrorFieldClassName,
  ExtraBlockWrapperClassName,
  FormClassName,
  SignupTextInputErrorClassName,
  SignupTextInputFieldClassName,
  TextInputContainerClassName,
} from 'src/utils'

const SignupPage = () => {
  return (
    <>
      <MetaTags
        title="Signup"
        description="Signup page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <SignupContent />
      <div id="LoginBlockWrapper" className={ExtraBlockWrapperClassName}>
        <LoginBlock />
      </div>
    </>
  )
}

export default SignupPage

const SignupContent = () => {
  return (
    <div
      id="SignupPageWrapper"
      className=" bg-[url('/signupBG.webp')] bg-black-1/95 bg-cover bg-blend-overlay flex justify-center items-center w-full px-4 md:px-8 py-12 md:py-16 h-screen"
    >
      <div
        id="SignupPageContent"
        className="w-full md:max-w-3xl rounded-3xl flex flex-col gap-16 md:gap-20 items-center justify-center p-2"
      >
        <img className="h-16 md:h-20 animate-spin" src={logo} alt="FW logo" />
        <p className="text-lg md:text-2xl text-secondary-normal w-full text-center">
          Start your journey with just an email
        </p>
        <SignupForm />
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
    (<Form onSubmit={onSubmit} className={FormClassName}>
      <div className={TextInputContainerClassName}>
        <TextField
          placeholder="Enter your email ID"
          inputMode="email"
          className={SignupTextInputFieldClassName}
          name="email"
          errorClassName={SignupTextInputErrorClassName}
          validation={{
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError className={ErrorFieldClassName} name="email" />
      </div>
      <div className={TextInputContainerClassName}>
        <PasswordField
          placeholder="Choose a password"
          className={SignupTextInputFieldClassName}
          name="password"
          errorClassName={SignupTextInputErrorClassName}
          validation={{
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: { value: 8, message: 'Minimum 8 characters' },
          }}
        />
        <FieldError className={ErrorFieldClassName} name="password" />
      </div>
      <SecondarySkewedButton
        label={loading ? '... Please Wait' : 'CREATE ACCOUNT'}
      />
    </Form>)
  );
}

const LoginBlock = () => {
  return (
    <div className="gap-2 flex flex-col items-center justify-center">
      <p className="text-base md:text-lg text-center text-white-1">
        {'Already have an account?'}
      </p>
      <PrimarySkewedButton
        label="LOGIN AND PLAY"
        onClick={() => {
          navigate(routes.login())
        }}
      />
    </div>
  )
}
