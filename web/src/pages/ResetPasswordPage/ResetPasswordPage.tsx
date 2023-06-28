import { useEffect, useState } from 'react'

import logo from 'public/Main 2.png'

import {
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import {
  ErrorFieldClassName,
  FormClassName,
  LogoAnimClassName,
  LogoClassName,
  LogoShadowClassName,
  PageContentClassName,
  PageWrapperClassName,
  TextInputContainerClassName,
  LoginTextInputErrorClassName,
  LoginTextInputFieldClassName,
  UnderlineButtonClassName,
} from 'src/utils'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  return (
    <>
      <MetaTags title="ResetPassword" description="ResetPassword page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <ResetPasswordContent resetToken={resetToken} />
    </>
  )
}

export default ResetPasswordPage

const ResetPasswordContent = ({ resetToken }: { resetToken: string }) => {
  return (
    <div id="ResetPageWrapper" className={PageWrapperClassName}>
      <div id="ResetPageContent" className={PageContentClassName}>
        <div className={LogoClassName}>
          <img
            className={LogoAnimClassName}
            src={logo}
            alt="Final Whistle - Logo"
          />
          <div className={LogoShadowClassName}></div>
        </div>
        <p className="text-lg md:text-2xl text-primary-normal w-full text-center">
          Great.. You can now set a new password!
        </p>
        <ResetPasswordForm resetToken={resetToken} />
        <RememberPasswordButton />
      </div>
    </div>
  )
}

const RememberPasswordButton = () => {
  return (
    <Link className={UnderlineButtonClassName} to={routes.login()}>
      I remember my previous password
    </Link>
  )
}

interface FormValues {
  password: string
}
const ResetPasswordForm = ({ resetToken }: { resetToken: string }) => {
  const { reauthenticate, validateResetToken, resetPassword } = useAuth()
  const [enabled, setEnabled] = useState(false)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        navigate(routes.forgotPassword())
      } else {
        setUsername(response.email)
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })
    setLoading(false)
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <Form onSubmit={onSubmit} className={FormClassName}>
      <label className="text-secondary-light text-base md:text-lg text-center">
        {username}
      </label>
      <div className={TextInputContainerClassName}>
        <PasswordField
          placeholder="Choose New Password"
          className={LoginTextInputFieldClassName}
          name="password"
          disabled={!enabled}
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
      <PrimarySkewedButton
        label={loading ? '... Please Wait' : 'CHANGE PASSWORD'}
      />
    </Form>
  )
}
