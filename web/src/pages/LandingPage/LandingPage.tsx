import bonusImage from 'public/bonus.png'
import betImage from 'public/diceBet.png'
import logo from 'public/Main 2.png'
import predictImage from 'public/tournamentDefault.png'
import tournamentLogo from 'public/uefa21.png'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { SignUpBlock } from 'src/components/Blocks/SignupBlock'
import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'
import { CurrentTournamentName } from 'src/utils'

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
  return (
    <div
      id="LandingBannerWrapper"
      className="bg-[url('/public/landingBG.webp')] bg-black-1/95 bg-cover bg-blend-overlay flex flex-col items-center w-full px-4 md:px-8 pt-16 md:pt-20 pb-6 md:pb-8 h-screen"
    >
      <div
        id="LandingBannerContainer"
        className="w-full md:max-w-3xl h-full flex flex-col items-center justify-center text-center gap-12 md:gap-16 px-2 py-2"
      >
        <h1 className="text-primary-normal text-4xl md:text-5xl font-extrabold">
          <p className="text-secondary-normal ">Unleash</p> the football pundit
          within you
        </h1>
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <p className="font-semibold text-white-1 w-full text-base md:text-xl">
            {
              'Come in and join the fantasy game that tests your football prediction skills'
            }
          </p>
          <PrimarySkewedButton
            label="START PLAYING"
            onClick={() => {
              navigate(routes.login())
            }}
          />
        </div>
        {/* <div className="w-full h-1 md:h-1.5 bg-primary-normal"></div> */}
        <div className="flex flex-col gap-2 items-center">
          <div className="whitespace-nowrap animate-pulse flex items-center justify-center px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm bg-secondary-normal text-white-2">
            ONGOING TOURNAMENT
          </div>
          <p className="text-sm md:text-base text-primary-normal">
            {CurrentTournamentName}
          </p>
          <img className="h-20 md:h-24" src={tournamentLogo} alt="Tour Logo" />
        </div>
      </div>
    </div>
  )
}

const ValuePropClassName =
  'w-full flex gap-4 md:gap-6 items-center justify-between border-2 border-primary-normal shadow-md shadow-primary-dark rounded-lg p-6 md:p-8'

const HeadlineClassName =
  'text-lg font-semibold md:text-2xl text-primary-normal'

const StartBodyClassName = 'text-sm md:text-base text-white-2 text-start'
const EndBodyClassName = 'text-sm md:text-base text-white-2 text-end'

const LandingContent = () => {
  return (
    <div
      id="LandingContentWrapper"
      className="w-full bg-black-2 flex flex-col gap-6 md:gap-8 items-center justify-start px-4 md:px-8 py-16 md:py-20"
    >
      <div
        id="ValuePropsContainer"
        className="flex w-full md:max-w-3xl flex-col gap-6 md:gap-8"
      >
        <div id="ValuePropPredict" className={ValuePropClassName}>
          <div
            id="ContentPredict"
            className="w-3/4 flex gap-3 md:gap-4 flex-col items-start"
          >
            <p className={HeadlineClassName}>Predict final scoreline</p>
            <p className={StartBodyClassName}>
              Guess the match result correctly to win points and climb the
              leaderboard
            </p>
          </div>
          <img
            className="w-1/4 aspect-square"
            src={predictImage}
            alt="predict"
          />
        </div>
        <div id="ValuePropBet" className={ValuePropClassName}>
          <img className="w-1/4 aspect-square" src={betImage} alt="predict" />
          <div
            id="ContentBet"
            className="w-3/4 gap-3 md:gap-4 flex flex-col items-end"
          >
            <p className={HeadlineClassName}>Take the risk</p>
            <p className={EndBodyClassName}>
              If you are confident, wager more coins to multiply your winnings
            </p>
          </div>
        </div>
        <div id="ValuePropBonus" className={ValuePropClassName}>
          <div
            id="ContentBonus"
            className="w-3/4 gap-3 md:gap-4 flex flex-col items-start"
          >
            <p className={HeadlineClassName}>Bonus: guess goalscorer</p>
            <p className={StartBodyClassName}>
              Predict who will score goals in the match to win extra points
            </p>
          </div>
          <img className="w-1/4 aspect-square" src={bonusImage} alt="predict" />
        </div>
      </div>
      <img
        className="w-32 md:w-40 mt-6 md:mt-10 self-center hover:animate-bounce"
        src={logo}
        alt="Final Whistle - Logo"
      />
      <SignUpBlock />
    </div>
  )
}
