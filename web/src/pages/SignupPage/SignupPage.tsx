import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import signUpBanner from 'public/goalkeeper.webp'
import logo from 'public/Logo1.png'
import {
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
  TextField,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { PrimaryRoundedButtonOutlined } from 'src/components/Buttons/RoundedButton/PrimaryRoundedButton'
import { SecondarySkewedButton } from 'src/components/Buttons/SkewedButton/SecondarySkewedButton'

const SignupPage = () => {
  return (
    <>
      <MetaTags
        title="Signup"
        description="Signuo page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <SignupBanner />
      <SignupContent />
    </>
  )
}

export default SignupPage

const SignupContent = () => {
  return (
    <div className="w-full md:w-1/2 bg-dark-3 h-screen flex flex-col gap-6 md:gap-8 items-center justify-center px-4 py-16">
      <img className="max-w-[128px] max-h-32" src={logo} alt="FW logo" />
      <p className="text-xl md:text-2xl text-secondary-normal font-bold w-2/3 text-center">
        Provide email and choose a password to create account!
      </p>
      <SignupForm />
      <LoginBlock />
    </div>
  )
}

interface FormValues {
  email: string
  password: string
}
const SignupForm = () => {
  const { isAuthenticated, signUp } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      // navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
    })
    console.log({ response })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome!')
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex h-full flex-col items-center justify-start gap-3 md:gap-4"
    >
      <div className="items-center flex flex-col">
        <TextField
          placeholder="Enter your email"
          inputMode="email"
          className="text-primary-dark placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-secondary-normal text-md md:text-lg"
          name="email"
          errorClassName="text-red-light placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-light text-lg md:text-xl"
          validation={{
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError
          className="text-xs md:text-sm text-red-light"
          name="email"
        />
      </div>
      <div className="items-center flex flex-col">
        <PasswordField
          placeholder="Choose a password"
          hidden={true}
          className="text-primary-dark placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-secondary-normal text-md md:text-lg"
          name="password"
          errorClassName="text-red-light placeholder:text-secondary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-light text-lg md:text-xl"
          validation={{
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: { value: 8, message: 'Minimum 8 characters' },
          }}
        />
        <FieldError
          className="text-xs md:text-sm text-red-light"
          name="password"
        />
      </div>
      <SecondarySkewedButton label="CREATE ACCOUNT" />
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
      <p className="text-sm md:text-base text-center text-primary-normal ">
        {loginText}
      </p>
      <PrimaryRoundedButtonOutlined
        label="LOGIN NOW!"
        onClick={navigateToLoginPage}
      />
    </div>
  )
}

const SignupBanner = () => {
  return (
    <div className="w-full md:w-1/2 bg-white-1 md:h-full hidden md:flex flex-col items-center justify-center gap-5 md:gap-8 px-8 py-24 md:py-16">
      {/* <img className="w-1/2" src={logo} alt="Signup Banner" /> */}
    </div>
  )
}
