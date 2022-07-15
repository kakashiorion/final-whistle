import {
  FieldError,
  Form,
  PasswordField,
  SubmitHandler,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import logo from 'public/Main 2.png'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'

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
    <div className=" bg-[url('/public/loginBG.jpeg')] bg-black-2 bg-cover bg-blend-overlay flex justify-start items-center w-full px-4 md:px-8 py-4 md:py-8 h-screen">
      <div className="w-full md:w-2/3 rounded-3xl h-full flex flex-col gap-6 md:gap-8 items-center justify-center px-4 py-16">
        <div className="flex flex-col items-end">
          <img
            className="w-20 self-center animate-bounce"
            src={logo}
            alt="Final Whistle - Logo"
          />
          <div className="bg-black-3 animate-[pulse_1s_ease-in-out_infinite] h-2 w-10 rounded-[50%]"></div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <p className="text-lg md:text-xl text-primary-normal w-full text-center">
            Great.. You can now set a new password!
          </p>
          <ResetPasswordForm resetToken={resetToken} />
          <RememberPasswordButton />
        </div>
      </div>
    </div>
  )
}

const RememberPasswordButton = () => {
  return (
    <Link
      className=" text-xs md:text-sm text-white-1 underline"
      to={routes.login()}
    >
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
        setUsername(response.username ?? response.email)
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
    <Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-3 md:gap-4"
    >
      <label className="text-secondary-light text-base md:text-lg text-center">
        {username}
      </label>
      <div className="items-center flex flex-col">
        <PasswordField
          placeholder="New Password"
          className="text-secondary-dark placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-primary-normal text-base md:text-lg"
          name="password"
          disabled={!enabled}
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
      <PrimarySkewedButton
        label={loading ? '... Please Wait' : 'CHANGE PASSWORD'}
      />
    </Form>
  )
}
