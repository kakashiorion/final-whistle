import { MetaTags } from '@redwoodjs/web'
import logo from 'public/Logo2.png'
import playerImage from 'public/playerImage.png'
import betImage from 'public/betImage.png'
import predictImage from 'public/tournamentDefault.png'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import { navigate, routes } from '@redwoodjs/router'
import { SecondaryRoundedButtonOutlined } from 'src/components/Buttons/RoundedButton/SecondaryRoundedButton'

const LandingPage = () => {
  return (
    <>
      <MetaTags
        title="Official Website"
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
  const subheadingText1 = 'Can you predict which team will win? '
  const subheadingText2 = 'Or who will score the winning goal?'
  const navigateToLoginPage = () => {
    navigate(routes.login())
  }
  return (
    <div className="bg-[url('/public/landingBG.webp')] bg-black-2 bg-cover bg-blend-overlay w-full px-4 md:px-8 py-4 md:py-8 h-screen">
      <div className="w-full md:w-2/3 h-full rounded-3xl flex flex-col items-start justify-center gap-5 md:gap-8 px-8 py-24 md:py-16">
        <h1 className="text-primary-normal text-5xl md:text-6xl font-extrabold text-left">
          <p className="text-secondary-normal ">Unleash</p> the football pundit
          within!
        </h1>
        <p className="font-semibold text-secondary-light w-full md:w-2/3 text-xl md:text-2xl">
          {subheadingText1}
          {subheadingText2}
        </p>
        <div className="px-4">
          <PrimarySkewedButton
            label="START PREDICTING"
            onClick={navigateToLoginPage}
          />
        </div>
        <div className="w-full h-1 md:h-2 bg-primary-normal"></div>
        <div className="flex gap-2 items-center">
          <div className="whitespace-nowrap animate-pulse flex items-center justify-center px-2 py-1 rounded-full text-[10px] md:text-xs bg-tertiary-normal text-white-2">
            NOW PLAYING
          </div>
          <p className="text-xs md:text-sm text-primary-normal">
            {currentTournament}
          </p>
        </div>
      </div>
    </div>
  )
}

const LandingContent = () => {
  return (
    <div className="w-full bg-black-1 h-full flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center px-4 md:px-8 py-8 md:py-20">
      <div className="flex w-full h-full md:w-2/3 flex-col gap-6 md:gap-8">
        <div className=" w-full h-full flex flex-col gap-3 md:gap-4 items-center justify-center bg-black-2 rounded-lg px-4 md:px-8 py-8 md:py-10">
          <div className="flex w-full justify-between items-center gap-4 md:gap-6">
            <div className="w-3/4 flex gap-3 md:gap-4 flex-col items-start">
              <p className="text-xl font-semibold md:text-2xl text-primary-normal ">
                Predict final scoreline
              </p>
              <p className="text-base md:text-lg text-white-2">
                Correctly guess the final result of every game to win points and
                climb the leaderboard
              </p>
            </div>
            <img className="w-1/4" src={predictImage} alt="predict" />
          </div>
        </div>
        <div className=" h-full w-full flex flex-col gap-3 md:gap-4 items-center justify-center  bg-black-2 rounded-lg px-4 md:px-8 py-8 md:py-10">
          <div className="flex w-full justify-between items-center gap-4 md:gap-6">
            <img className="w-1/4" src={betImage} alt="predict" />
            <div className="w-3/4 gap-3 md:gap-4 flex flex-col items-end">
              <p className="text-xl font-semibold md:text-2xl text-primary-normal text-end">
                Bet to multiply winnings
              </p>
              <p className="text-base md:text-lg text-white-2 text-end">
                Wager more coins and win upto 3x points if you are confident in
                your prediction skills
              </p>
            </div>
          </div>
        </div>
        <div className=" h-full w-full flex flex-col gap-3 md:gap-4 items-center justify-center  bg-black-2 rounded-lg px-4 md:px-8 py-8 md:py-10">
          <div className="flex w-full justify-between items-center gap-4 md:gap-6">
            <div className="w-3/4 gap-3 md:gap-4 flex flex-col items-start">
              <p className="text-xl font-semibold md:text-2xl text-primary-normal text-start">
                Guess goalscorers for bonus
              </p>
              <p className="text-base md:text-lg text-white-2 text-start">
                With nothing to lose, predict which players will score goals to
                earn bonus points
              </p>
            </div>
            <img className="w-1/4" src={playerImage} alt="predict" />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 h-full flex flex-col gap-4 md:gap-6 items-center justify-center px-4 py-4 md:py-20">
        <img
          className="w-40 self-center"
          src={logo}
          alt="Final Whistle - Logo"
        />
        <SignUpBlock />
      </div>
    </div>
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
