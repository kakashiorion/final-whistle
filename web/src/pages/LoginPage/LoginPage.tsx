import { useState } from 'react'

import logo from 'public/Main 2.png'

import {
  TextField,
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { SignUpBlock } from 'src/components/Blocks/SignupBlock'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import {
  TextInputContainerClassName,
  LoginTextInputFieldClassName,
  LoginTextInputErrorClassName,
  ErrorFieldClassName,
  FormClassName,
  UnderlineButtonClassName,
  LogoShadowClassName,
  LogoAnimClassName,
  LogoClassName,
  PageContentClassName,
  PageWrapperClassName,
  ExtraBlockWrapperClassName,
} from 'src/utils'

const LoginPage = () => {
  return (
    <>
      <MetaTags
        title="Login"
        description="Login page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <LoginContent />
      <div id="SignupBlockWrapper" className={ExtraBlockWrapperClassName}>
        <SignUpBlock />
      </div>
    </>
  )
}

export default LoginPage

const LoginContent = () => {
  return (
    <div id="LoginPageWrapper" className={PageWrapperClassName}>
      <div id="LoginPageContent" className={PageContentClassName}>
        <div className={LogoClassName}>
          <img
            className={LogoAnimClassName}
            src={logo}
            alt="Final Whistle - Logo"
          />
          <div className={LogoShadowClassName}></div>
        </div>
        <p className="text-lg md:text-2xl text-primary-normal w-full text-center">
          Login with your email and password
        </p>
        <LoginForm />
        <ForgotPasswordButton />
      </div>
    </div>
  )
}

const ForgotPasswordButton = () => {
  return (
    <Link className={UnderlineButtonClassName} to={routes.forgotPassword()}>
      Forgot Password?
    </Link>
  )
}

interface FormValues {
  email: string
  password: string
}
const LoginForm = () => {
  const { logIn } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    const response = await logIn({
      username: data.email,
      password: data.password,
    })
    setLoading(false)
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    (<Form onSubmit={onSubmit} className={FormClassName}>
      <div id="EmailContainer" className={TextInputContainerClassName}>
        <TextField
          placeholder="Email"
          className={LoginTextInputFieldClassName}
          name="email"
          inputMode="email"
          defaultValue={"gamer1@fw.com"}
          errorClassName={LoginTextInputErrorClassName}
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
      <div id="PasswordContainer" className={TextInputContainerClassName}>
        <PasswordField
          placeholder="Password"
          className={LoginTextInputFieldClassName}
          name="password"
          defaultValue={"12345678"}
          errorClassName={LoginTextInputErrorClassName}
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
      <PrimarySkewedButton label={loading ? '... Please Wait' : 'KICK OFF'} />
    </Form>)
  );
}
