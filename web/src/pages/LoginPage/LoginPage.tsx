import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import logo from 'public/Main.png'
import loginBanner from 'public/goalkeeper.webp'
import logoText from 'public/Logo Text 3.png'
import {
  TextField,
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { SecondaryRoundedButtonOutlined } from 'src/components/Buttons/RoundedButton/SecondaryRoundedButton'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'

const LoginPage = () => {
  return (
    <>
      <MetaTags
        title="Login"
        description="Login page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <LoginContent />
      <LoginBanner />
    </>
  )
}

export default LoginPage

const LoginContent = () => {
  return (
    <div className="w-full md:w-1/2 bg-dark-2 h-screen flex flex-col gap-6 md:gap-8 items-center justify-center px-4 py-16">
      <div className="flex flex-col items-end">
        <img
          className="w-20 self-center animate-bounce"
          src={logo}
          alt="Final Whistle - Logo"
        />
        <div className="bg-black-3 animate-[pulse_1s_ease-in-out_infinite] h-2 w-10 rounded-[50%]"></div>
      </div>
      <img className="h-10" src={logoText} alt="logo text" />
      <div className="flex h-full flex-col gap-3 items-center justify-start">
        <LoginForm />
        <ForgotPasswordButton />
      </div>
      <SignUpBlock />
    </div>
  )
}

const ForgotPasswordButton = () => {
  return (
    <Link
      className=" text-xs md:text-sm text-white-1 underline"
      to={routes.forgotPassword()}
    >
      Forgot Password?
    </Link>
  )
}
interface FormValues {
  email: string
  password: string
}
const LoginForm = () => {
  const { isAuthenticated, logIn } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      // navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })
    console.log({ response })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-start gap-3 md:gap-4"
    >
      <div className="items-center flex flex-col">
        <TextField
          placeholder="Email"
          className="text-secondary-dark placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-primary-normal text-md md:text-lg"
          name="email"
          inputMode="email"
          errorClassName="text-red-light placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-light text-lg md:text-xl"
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
          placeholder="Password"
          className="text-secondary-dark placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-primary-normal text-md md:text-lg"
          name="password"
          errorClassName="text-red-light placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-2 border-red-light text-lg md:text-xl"
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
      <PrimarySkewedButton label="KICK OFF!" />
    </Form>
  )
}

const SignUpBlock = () => {
  const navigateToSignUpPage = () => {
    navigate(routes.signup())
  }
  const signupText = "Don't have an account?"

  return (
    <div className="gap-2 flex flex-col items-center justify-center">
      <p className="text-sm md:text-base text-center text-secondary-normal ">
        {signupText}
      </p>
      <SecondaryRoundedButtonOutlined
        label="SIGN UP TO PLAY!"
        onClick={navigateToSignUpPage}
      />
    </div>
  )
}

const LoginBanner = () => {
  return (
    <div className="w-full md:w-1/2 bg-white-1 md:h-full hidden md:flex flex-col items-start justify-center gap-5 md:gap-8 px-8 py-24 md:py-16">
      <img src={loginBanner} alt="Login Banner" />
    </div>
  )
}
