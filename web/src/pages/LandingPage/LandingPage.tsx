import { MetaTags } from '@redwoodjs/web'
import logo from 'public/Logo2.png'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import { navigate, routes } from '@redwoodjs/router'
import { SecondaryRoundedButtonOutlined } from 'src/components/Buttons/RoundedButton/SecondaryRoundedButton'
import { useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'

const LandingPage = () => {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <MetaTags
        title="Welcome"
        description="Official landing page for Final Whistle - the football prediction game"
      />
      <LandingBanner />
      <LandingContent />
    </>
  )
}

export default LandingPage

const LandingBanner = () => {
  const currentTournament = "FIFA U-20 Women's World Cup Costa Rica 2022"
  const subheadingText =
    'Can you predict which team will win... or who will score the winning goal?'
  const navigateToLoginPage = () => {
    navigate(routes.login())
  }
  return (
    <div className="w-full md:w-2/3 bg-white-1 md:h-full flex flex-col items-start justify-center gap-5 md:gap-8 px-8 py-24 md:py-16">
      <div className="rounded-full bg-light-2 h-2/3 aspect-square absolute -left-20 top-[1/8] "></div>
      <h1 className="text-primary-normal text-5xl md:text-6xl font-extrabold text-left z-10">
        <p className="text-secondary-normal ">Unleash</p> the football pundit
        within!
      </h1>
      <p className="font-semibold text-secondary-normal text-xl md:text-2xl z-10">
        {subheadingText}
      </p>
      <div className="px-4">
        <PrimarySkewedButton
          label="START PREDICTING"
          onClick={navigateToLoginPage}
        />
      </div>
      <div className="w-5/6 h-2 md:h-3 bg-primary-normal z-10"></div>
      <div className="flex gap-2 items-center">
        <div className="whitespace-nowrap animate-pulse flex items-center justify-center px-2 py-1 rounded-full text-[10px] md:text-xs bg-tertiary-normal text-white-1">
          NOW PLAYING
        </div>
        <p className="text-xs md:text-sm text-primary-dark z-10">
          {currentTournament}
        </p>
      </div>
    </div>
  )
}

const LandingContent = () => {
  return (
    <div className="w-full md:w-1/3 bg-light-2 h-full flex flex-col gap-4 md:gap-6 items-center justify-center px-4 py-20">
      <img className="w-40 self-center" src={logo} alt="Final Whistle - Logo" />
      <SignUpBlock />
    </div>
  )
}

const SignUpBlock = () => {
  const navigateToSignUpPage = () => {
    navigate(routes.signup())
  }
  const signupText = "Don't have an account?"

  return (
    <div className="gap-2 flex flex-col items-center justify-center">
      <p className="text-sm md:text-base text-center text-secondary-normal font-bold">
        {signupText}
      </p>
      <SecondaryRoundedButtonOutlined
        label="SIGN UP TO PLAY!"
        onClick={navigateToSignUpPage}
      />
    </div>
  )
}
