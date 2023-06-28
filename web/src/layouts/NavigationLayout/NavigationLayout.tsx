import { useEffect, useState } from 'react'

import CloseIcon from 'public/CloseIcon.png'
import HomeIcon from 'public/HomeIcon.png'
import LeaderIcon from 'public/LeaderIcon.png'
import logoText from 'public/Logo Text 1.png'
import LogoutIcon from 'public/LogoutIcon.png'
import logo from 'public/Main 2.png'
import MatchIcon from 'public/MatchIcon.png'
import OpenIcon from 'public/OpenIcon.png'
import ProfileIcon from 'public/ProfileIcon.png'
import RulesIcon from 'public/RulesIcon.png'
import TeamIcon from 'public/TeamIcon.png'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import StatsBarCell from 'src/components/StatsBarCell'
import TournamentHeaderCell from 'src/components/TournamentHeaderCell'
import { CurrentTournamentID } from 'src/utils'

type NavigationLayoutProps = {
  children?: React.ReactNode
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const { currentUser } = useAuth()
  useEffect(() => {
    if (!currentUser.username || !currentUser.coins) {
      navigate(routes.userSetup())
    }
  }, [currentUser.username, currentUser.coins])
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div
      id="HomeWrapper"
      className="flex bg-[url('/public/homeBG.avif')] bg-black-1/95 bg-cover bg-blend-overlay flex-col overflow-hidden w-full items-center justify-center "
    >
      <Toaster toastOptions={{ className: 'rw-toast', duration: 4000 }} />
      <SidebarIcon
        setSidebarOpen={setSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <div
        id="HomeContent"
        className="flex w-full h-screen items-start overflow-hidden"
      >
        <NavigationSidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          id="HomeMainContainer"
          className="flex flex-col h-full items-start justify-start w-full overflow-hidden px-6 py-6 gap-6 md:gap-8"
        >
          <TournamentHeaderCell id={CurrentTournamentID} />
          {children}
        </div>
        <StatsBarCell id={CurrentTournamentID} />
      </div>
    </div>
  )
}

export default NavigationLayout

const SidebarIcon = ({
  setSidebarOpen,
  isSidebarOpen,
}: {
  setSidebarOpen: (b: boolean) => void
  isSidebarOpen: boolean
}) => {
  return (
    <button
      onClick={() => setSidebarOpen(!isSidebarOpen)}
      className="absolute top-6 left-6 flex md:hidden z-30"
    >
      <img
        className="h-6"
        src={isSidebarOpen ? CloseIcon : OpenIcon}
        alt="sidebar open icon"
      />
    </button>
  )
}

const NavigationSidebar = ({
  setSidebarOpen,
  isSidebarOpen,
}: {
  setSidebarOpen: (b: boolean) => void
  isSidebarOpen: boolean
}) => {
  return (
    <div
      id="SidebarContainer"
      className={
        'z-20 backdrop-blur-sm min-w-max h-screen bg-dark-3 bg-opacity-90 md:bg-opacity-60 absolute md:relative px-4 md:px-6 py-20 md:py-10 flex-col items-start justify-start gap-7 md:gap-8 md:flex ' +
        (isSidebarOpen ? `flex` : 'hidden')
      }
    >
      <NavLogo />
      <NavTournament setSidebarOpen={setSidebarOpen} />
      <NavUser setSidebarOpen={setSidebarOpen} />
    </div>
  )
}

const NavLogo = () => {
  return (
    <Link
      to={routes.home()}
      className="flex gap-4 md:gap-5 w-full px-2 py-2 items-center justify-start"
    >
      <img className="w-6 md:w-7" src={logo} alt="FW Logo" />
      <img className="h-6 md:h-7" src={logoText} alt="Logo text" />
    </Link>
  )
}

const NavTournament = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (b: boolean) => void
}) => {
  return (
    <div className="py-2 md:py-3 flex flex-col gap-4 md:gap-5 w-full items-start text-white-3 text-base md:text-lg font-semibold">
      <NavMenuItem
        labelName="Home"
        Icon={HomeIcon}
        routeName={routes.home()}
        setSidebarOpen={setSidebarOpen}
      />
      <NavMenuItem
        labelName="Matches"
        Icon={MatchIcon}
        routeName={routes.allMatches()}
        setSidebarOpen={setSidebarOpen}
      />
      <NavMenuItem
        labelName="Teams"
        Icon={TeamIcon}
        routeName={routes.allTeams()}
        setSidebarOpen={setSidebarOpen}
      />
      <NavMenuItem
        labelName="Leaderboard"
        Icon={LeaderIcon}
        routeName={routes.leaderboard()}
        setSidebarOpen={setSidebarOpen}
      />
      <NavMenuItem
        labelName="Rules"
        Icon={RulesIcon}
        routeName={routes.rules()}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  )
}

const NavUser = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (b: boolean) => void
}) => {
  const { logOut, currentUser } = useAuth()

  return (
    <div className="py-2 md:py-3 flex flex-col gap-4 md:gap-5 w-full items-start text-white-3 text-base md:text-lg font-semibold">
      <NavMenuItem
        labelName={currentUser.username}
        Icon={ProfileIcon}
        routeName={routes.userProfile()}
        setSidebarOpen={setSidebarOpen}
      />
      <button
        onClick={logOut}
        className="flex gap-4 md:gap-5 p-3 items-center justify-start hover:bg-black-4 hover:bg-opacity-40 w-full rounded"
      >
        <img className="w-6 md:w-7" src={LogoutIcon} alt="FW - Logout" />
        <p className="text-red-normal">Logout</p>
      </button>
    </div>
  )
}

interface MenuItemProps {
  labelName: string
  Icon: string
  routeName: string
  setSidebarOpen: (b: boolean) => void
}

const NavMenuItem = (props: MenuItemProps) => {
  return (
    <Link
      to={props.routeName}
      onClick={() => props.setSidebarOpen(false)}
      className="flex gap-4 md:gap-5 p-3 items-center justify-start hover:bg-black-4 hover:bg-opacity-40 w-full rounded hover:text-primary-normal"
    >
      <img
        className="w-6 md:w-7"
        src={props.Icon}
        alt={'FW - ' + props.labelName}
      />
      <p className="w-full">{props.labelName}</p>
    </Link>
  )
}
