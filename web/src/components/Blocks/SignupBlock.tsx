import { navigate, routes } from '@redwoodjs/router'

import { SecondarySkewedButton } from '../Buttons/SkewedButton/SecondarySkewedButton'

export const SignUpBlock = () => {
  return (
    <div
      id="SignupBlock"
      className="gap-3 w-3/4 md:gap-4 flex flex-col items-center justify-center"
    >
      <p className="text-base md:text-lg text-center text-white-1">
        {'Have not joined yet... What are you waiting for?'}
      </p>
      <SecondarySkewedButton
        label="SIGN UP AND PLAY"
        onClick={() => {
          navigate(routes.signup())
        }}
      />
    </div>
  )
}
