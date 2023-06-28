import coin from 'public/coin.png'
import dice from 'public/diceBet.png'

import { MetaTags } from '@redwoodjs/web'

import {
  CurrentTournamentInitialCoins,
  RulesPageClassName,
  SectionDivClassName,
  SectionHeaderClassName,
  SectionPointsClassName,
  SubSectionTabClassName,
} from 'src/utils'

const RulesPage = () => {
  return (
    <>
      <MetaTags
        title="Rules"
        description="Rules page for Final Whistle - the football prediction game "
      />
      <div id="Rulespage" className={RulesPageClassName}>
        <h1 id="Header" className="text-primary-normal text-xl md:text-3xl">
          Rules
        </h1>
        <div id="Account" className={SectionDivClassName}>
          <p className={SectionHeaderClassName}>Account</p>
          <div className={SectionPointsClassName}>
            <p>
              1. All the gamers on the platform are identified by a username.
              This username will be displayed on the leaderboard and will be
              visible to others.
            </p>
            <p>
              2. Every user receives {CurrentTournamentInitialCoins}
              <img
                className="h-5 md:h-6 inline px-2"
                src={coin}
                alt="coins"
              ></img>
              coins at the start of the tournament.
            </p>
          </div>
        </div>
        <div id="Gameplay" className={SectionDivClassName}>
          <p className={SectionHeaderClassName}>Gameplay</p>
          <div className={SectionPointsClassName}>
            <p>
              1. The goal of the game is to earn as many points as possible
              throughout the tournament and climb up the leaderboard.
            </p>
            <p>
              2. Gamers earn points by correctly predicting the result of every
              match in the tournament.
            </p>
            <p>
              3. Gamers can also earn bonus points by correctly predicting the
              goalscorers in each match.
            </p>
          </div>
        </div>
        <div id="Prediction" className={SectionDivClassName}>
          <p className={SectionHeaderClassName}>Predictions</p>
          <div className={SectionPointsClassName}>
            <p>
              1. Predictions can be made for any upcoming match till its
              kick-off.
            </p>
            <p>2. To make a prediction, the gamer must do the following:</p>
            <p className={SubSectionTabClassName}>
              a. Select the upcoming match on the home page for which the gamer
              wants to make a prediction.
            </p>
            <p className={SubSectionTabClassName}>
              b. On the Predict Match page, the gamer has to guess the number of
              goals each team will score in the match. This can be done by
              selecting as many football icons under each team as the goals you
              think they will score. If your guess is 0 goal, click the glove
              icon.
            </p>
            <p className={SubSectionTabClassName}>
              c. Also, if you predict a team will score some goals, you get a
              chance to predict which players from that team will score those
              goals. This is an optional step. But it is a good way to earn
              extra points.
            </p>
            <p className={SubSectionTabClassName}>
              d. Next, the gamer must place a bet. Remember the coins we gave
              you at the start of the tournament? You can use those coins as
              wager. The more confident you are about your predictions, the more
              coins you should wager. And the more coins you wager in a match,
              the more points you can earn depending on the result.
            </p>
            <p className={SubSectionTabClassName}>
              e. Finally, you must save the prediction. Once you have saved the
              prediction for a match, you can see a green check against the
              upcoming match on the home page.
            </p>
            <p>
              3. A saved prediction can still be updated or deleted before the
              kick-off.
            </p>
            <p>
              4. Every match in the tournament except for the final has a wager
              limit. You cannot wager more coins than this limit. Wager limits
              are different across various rounds of the tournament. 100 for
              group stage matches, 200 for round of 16, 300 for quarterfinals,
              and 500 for semi-finals.
            </p>
          </div>
        </div>
        <div id="Result" className={SectionDivClassName}>
          <p className={SectionHeaderClassName}>Results</p>
          <div className={SectionPointsClassName}>
            <p>
              1. When a match has concluded, if the gamer has made a prediction
              for it, points are earned. These points add up to be the total
              points of the gamer.
            </p>
            <p>
              2. You can view points earned for each match in the Recent Results
              list on the home page.
            </p>
            <p>3. Points are calculated as follows:</p>
            <p className={SubSectionTabClassName}>
              a. If the exact scoreline was predicted by the gamer, the
              multiplier is
              <span className="text-white-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full bg-green-dark inline">
                3X
              </span>
              . For example, if you predicted 2-1 and the home team won 2-1 .
            </p>
            <p className={SubSectionTabClassName}>
              b. If correct goal difference was predicted by the gamer, the
              multiplier is
              <span className="text-white-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full bg-primary-dark inline">
                2X
              </span>
              . For example, if you predicted 2-1 but the home team won 3-2. Or
              if the game was draw 1-1 and you predicted 2-2.
            </p>
            <p className={SubSectionTabClassName}>
              c. If the correct match result was predicted by the gamer, the
              multiplier is
              <span className="text-white-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full bg-black-1 inline">
                1X
              </span>
              . For example, if you predicted 2-1 but the home team won 3-0.
            </p>
            <p className={SubSectionTabClassName}>
              d. If you predicted wrong team to win, the multiplier is
              <span className="text-white-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full bg-red-dark inline">
                0X
              </span>
              . For example, if you predicted the home team to win 2-1 but they
              lost 0-1.
            </p>
            <p className={SubSectionTabClassName}>
              e. For every correct goalscorer guessed, a{' '}
              <span className="text-white-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded-full bg-secondary-dark inline">
                1X
              </span>{' '}
              multiplier is added. For example, if you predicted 4 players to
              score a goal each, but 2 of them actually scored goals in the
              match, you earn a 2X bonus. Obviously, own goals do not count.
            </p>
            <p className={SubSectionTabClassName}>
              f. Finally, your wagered coins are mutliplied by the accumulated
              multiplier. For example, if you got 3X for correctly guessing the
              exact scoreline and 2X for guessing 2 goalscorers, your total
              mutliplier for this prediction is 5X. If you had wagered
              <img
                className="h-5 md:h-6 inline px-2"
                src={dice}
                alt="dice"
              ></img>
              50 coins, you have now
              <span className="text-white-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-sm md:text-base rounded-full bg-primary-normal inline">
                Earned 250 points
              </span>
              in this match.
            </p>
            <p>
              3. If you cannot see the score or earned points for a concluded
              match, do not worry. They will be available when we update the
              match results on the platform. Give us some time.
            </p>
          </div>
        </div>
        <div id="Misc" className={SectionDivClassName}>
          <p className={SectionHeaderClassName}>Misc</p>
          <div className={SectionPointsClassName}>
            <p>
              1. You can find the number of gamers who have made predictions for
              a match on the home page.
              <span className="text-black-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-sm md:text-base rounded-full bg-secondary-light inline">
                23
              </span>
            </p>
            <p>
              2. You can also view how many predictions were successful for a
              concluded match.
              <span className="text-black-1 mx-2 px-3 md:px-4 py-1 md:py-1.5 text-sm md:text-base rounded-full bg-green-light inline">
                40%
              </span>
            </p>
            <p>
              3. Keep an eye out on the global prediction stats in the right
              sidebar. It lists the topmost predicted scorelines or goalscorers
              by other gamers.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RulesPage
