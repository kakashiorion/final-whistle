import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, SubmitHandler, TextField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import logo from 'public/Main 2.png'
import { SecondaryRoundedButtonOutlined } from 'src/components/Buttons/RoundedButton/SecondaryRoundedButton'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaTags
        title="Forgot Password"
        description="Password retrieval page for Final Whistle - the football prediction game"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <ForgotPasswordContent />
    </>
  )
}

export default ForgotPasswordPage

const ForgotPasswordContent = () => {
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
            You will receive a link in your email to reset password
          </p>
          <ForgotPasswordForm />
          <RememberPasswordButton />
        </div>
        <SignUpBlock />
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
      I remember my password
    </Link>
  )
}

interface FormValues {
  email: string
}
const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuth()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await forgotPassword(data.email)
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Link sent.. Check your email!')
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-3 md:gap-4"
    >
      <div className="items-center flex flex-col">
        <TextField
          placeholder="Provide your email ID"
          className="text-secondary-dark placeholder:text-primary-light rounded-tl-lg rounded-br-lg px-3 py-1 bg-white-1 border-transparent border-4 focus:border-primary-normal text-base md:text-lg"
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
      <PrimarySkewedButton label="SEND ME LINK!" />
    </Form>
  )
}

const SignUpBlock = () => {
  const navigateToSignUpPage = () => {
    navigate(routes.signup())
  }
  const signupText = "Don't have an account yet?"

  return (
    <div className="gap-2 flex flex-col items-center justify-center">
      <p className="text-base md:text-lg text-center whitespace-nowrap text-secondary-normal font-bold">
        {signupText}
      </p>
      <SecondaryRoundedButtonOutlined
        label="SIGN UP AND PLAY!"
        onClick={navigateToSignUpPage}
      />
    </div>
  )
}
