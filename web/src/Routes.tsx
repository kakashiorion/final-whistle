// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {
  Router,
  Route,
  Set,
  Private,
  // ,Private
} from '@redwoodjs/router'
import MatchPredictionsLayout from 'src/layouts/MatchPredictionsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import TeamsInMatchesLayout from 'src/layouts/TeamsInMatchesLayout'
import MatchesLayout from 'src/layouts/MatchesLayout'
import PlayersLayout from 'src/layouts/PlayersLayout'
import TeamsLayout from 'src/layouts/TeamsLayout'
import TournamentsLayout from 'src/layouts/TournamentsLayout'
import LandingLayout from './layouts/LandingLayout/LandingLayout'
import NavigationLayout from './layouts/NavigationLayout/NavigationLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="landing" roles={['Admin']}>
        <Set wrap={MatchPredictionsLayout}>
          <Route path="/admin/match-predictions/new" page={MatchPredictionNewMatchPredictionPage} name="newMatchPrediction" />
          <Route path="/admin/match-predictions/{id:Int}/edit" page={MatchPredictionEditMatchPredictionPage} name="editMatchPrediction" />
          <Route path="/admin/match-predictions/{id:Int}" page={MatchPredictionMatchPredictionPage} name="matchPrediction" />
          <Route path="/admin/match-predictions" page={MatchPredictionMatchPredictionsPage} name="matchPredictions" />
        </Set>
        <Set wrap={UsersLayout}>
          <Route path="/admin/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/admin/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/admin/users" page={UserUsersPage} name="users" />
        </Set>
        <Set wrap={TeamsInMatchesLayout}>
          <Route path="/admin/teams-in-matches/new" page={TeamsInMatchNewTeamsInMatchPage} name="newTeamsInMatch" />
          <Route path="/admin/teams-in-matches/{id:Int}/edit" page={TeamsInMatchEditTeamsInMatchPage} name="editTeamsInMatch" />
          <Route path="/admin/teams-in-matches/{id:Int}" page={TeamsInMatchTeamsInMatchPage} name="teamsInMatch" />
          <Route path="/admin/teams-in-matches" page={TeamsInMatchTeamsInMatchesPage} name="teamsInMatches" />
        </Set>
        <Set wrap={MatchesLayout}>
          <Route path="/admin/matches/new" page={MatchNewMatchPage} name="newMatch" />
          <Route path="/admin/matches/{id:Int}/edit" page={MatchEditMatchPage} name="editMatch" />
          <Route path="/admin/matches/{id:Int}" page={MatchMatchPage} name="match" />
          <Route path="/admin/matches" page={MatchMatchesPage} name="matches" />
        </Set>
        <Set wrap={PlayersLayout}>
          <Route path="/admin/players/new" page={PlayerNewPlayerPage} name="newPlayer" />
          <Route path="/admin/players/{id:Int}/edit" page={PlayerEditPlayerPage} name="editPlayer" />
          <Route path="/admin/players/{id:Int}" page={PlayerPlayerPage} name="player" />
          <Route path="/admin/players" page={PlayerPlayersPage} name="players" />
        </Set>
        <Set wrap={TeamsLayout}>
          <Route path="/admin/teams/new" page={TeamNewTeamPage} name="newTeam" />
          <Route path="/admin/teams/{id:Int}/edit" page={TeamEditTeamPage} name="editTeam" />
          <Route path="/admin/teams/{id:Int}" page={TeamTeamPage} name="team" />
          <Route path="/admin/teams" page={TeamTeamsPage} name="teams" />
        </Set>
        <Set wrap={TournamentsLayout}>
          <Route path="/admin/tournaments/new" page={TournamentNewTournamentPage} name="newTournament" />
          <Route path="/admin/tournaments/{id:Int}/edit" page={TournamentEditTournamentPage} name="editTournament" />
          <Route path="/admin/tournaments/{id:Int}" page={TournamentTournamentPage} name="tournament" />
          <Route path="/admin/tournaments" page={TournamentTournamentsPage} name="tournaments" />
        </Set>
      </Private>
      <Private unauthenticated="landing">
        <Set wrap={NavigationLayout}>
          <Route path="/user-profile" page={UserProfilePage} name="userProfile" />
          <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
          <Route path="/rules" page={RulesPage} name="rules" />
          <Route path="/all-teams" page={TeamsPage} name="allTeams" />
          <Route path="/all-matches" page={MatchesPage} name="allMatches" />
          <Route path="/" page={HomePage} name="home" />
          <Route path="/match-result/{id:Int}" page={MatchResultPage} name="matchResult" />
          <Route path="/match-predict/{id:Int}" page={MatchPredictPage} name="matchPredict" />
        </Set>
        <Route path="/user-setup" page={UserSetupPage} name="userSetup" />
      </Private>
      <Set wrap={LandingLayout}>
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/landing" page={LandingPage} name="landing" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
