import { useState } from 'react'

import logo from 'public/Main 2.png'

import { FieldError, Form, SubmitHandler, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { SignUpBlock } from 'src/components/Blocks/SignupBlock'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import {
  ErrorFieldClassName,
  FormClassName,
  LogoAnimClassName,
  LogoClassName,
  LogoShadowClassName,
  PageContentClassName,
  PageWrapperClassName,
  ExtraBlockWrapperClassName,
  TextInputContainerClassName,
  LoginTextInputErrorClassName,
  LoginTextInputFieldClassName,
  UnderlineButtonClassName,
} from 'src/utils'

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaTags
        title="Forgot Password"
        description="Password retrieval page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <ForgotPasswordContent />
      <div id="SignupBlockWrapper" className={ExtraBlockWrapperClassName}>
        <SignUpBlock />
      </div>
    </>
  )
}

export default ForgotPasswordPage

const ForgotPasswordContent = () => {
  return (
    <div id="ForgotPageWrapper" className={PageWrapperClassName}>
      <div id="ForgotPageContent" className={PageContentClassName}>
        <div className={LogoClassName}>
          <img
            className={LogoAnimClassName}
            src={logo}
            alt="Final Whistle - Logo"
          />
          <div className={LogoShadowClassName}></div>
        </div>
        <p className="text-lg md:text-2xl text-primary-normal w-full text-center">
          You will receive a link in your email to reset the password
        </p>
        <ForgotPasswordForm />
        <RememberPasswordButton />
      </div>
    </div>
  )
}
const RememberPasswordButton = () => {
  return (
    <Link className={UnderlineButtonClassName} to={routes.login()}>
      I remember my password
    </Link>
  )
}

interface FormValues {
  email: string
}
const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    const response = await forgotPassword(data.email)
    setLoading(false)
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Link sent.. Check your email!')
    }
  }

  return (
    <Form onSubmit={onSubmit} className={FormClassName}>
      <div className={TextInputContainerClassName}>
        <TextField
          placeholder="Enter your email ID"
          className={LoginTextInputFieldClassName}
          name="email"
          inputMode="email"
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
      <PrimarySkewedButton
        label={loading ? '... Please Wait' : 'GET RESET LINK'}
      />
    </Form>
  )
}
