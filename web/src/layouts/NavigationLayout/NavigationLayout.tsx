import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'
import logoText3 from 'public/Logo Text 1.png'
import logo from 'public/Main 2.png'
import OpenIcon from 'public/OpenIcon.png'
import CloseIcon from 'public/CloseIcon.png'
import HomeIcon from 'public/HomeIcon.png'
import MatchIcon from 'public/MatchIcon.png'
import TeamIcon from 'public/TeamIcon.png'
import LeaderIcon from 'public/LeaderIcon.png'
import RulesIcon from 'public/RulesIcon.png'
import ProfileIcon from 'public/ProfileIcon.png'
import LogoutIcon from 'public/LogoutIcon.png'
import { useEffect, useState } from 'react'
import StatsBarCell from 'src/components/StatsBarCell'
import TournamentHeaderCell from 'src/components/TournamentHeaderCell'

type NavigationLayoutProps = {
  children?: React.ReactNode
}

const currentTournament = 2

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const { currentUser } = useAuth()
  useEffect(() => {
    if (!currentUser.username) {
      navigate(routes.userSetup())
    }
  }, [currentUser.username])
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <div className="flex bg-[url('/public/homeBG.avif')] bg-black-2 bg-cover bg-blend-overlay flex-col overflow-hidden w-full items-center justify-center ">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 4000 }} />
        <SidebarIcon
          setSidebarOpen={setSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex w-full h-screen items-start">
          <NavigationSidebar isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-col h-full items-start justify-start w-full overflow-hidden px-6 py-6 gap-6 md:gap-8 rounded-md ">
            <TournamentHeaderCell id={currentTournament} />
            {children}
          </div>
          <StatsBarCell id={currentTournament} />
        </div>
      </div>
    </>
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

const NavigationSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <>
      <div
        className={
          'z-20 backdrop-blur-sm min-w-max h-full bg-dark-1 bg-opacity-60 absolute md:relative px-4 md:px-8 py-16 md:py-20 flex-col items-start justify-start gap-6 md:gap-8 md:flex ' +
          (isSidebarOpen ? `flex` : 'hidden')
        }
      >
        <NavLogo />
        <NavTournament />
        <NavUser />
      </div>
    </>
  )
}

const NavLogo = () => {
  return (
    <Link
      to={routes.home()}
      className="flex gap-4 md:gap-5 w-full px-2 py-2 items-center justify-start"
    >
      <img className="h-6" src={logo} alt="FW Logo" />
      <img className="h-6" src={logoText3} alt="Logo text" />
    </Link>
  )
}

const NavTournament = () => {
  return (
    <div className="py-2 md:py-3 flex flex-col gap-4 md:gap-5 w-full items-start text-white-3 md:text-lg font-semibold">
      <NavMenuItem labelName="Home" Icon={HomeIcon} routeName={routes.home()} />
      <NavMenuItem
        labelName="Matches"
        Icon={MatchIcon}
        routeName={routes.allMatches()}
      />
      <NavMenuItem
        labelName="Teams"
        Icon={TeamIcon}
        routeName={routes.allTeams()}
      />
      <NavMenuItem
        labelName="Leaderboard"
        Icon={LeaderIcon}
        routeName={routes.leaderboard()}
      />
      <NavMenuItem
        labelName="Rules"
        Icon={RulesIcon}
        routeName={routes.rules()}
      />
    </div>
  )
}

const NavUser = () => {
  const { logOut, currentUser } = useAuth()

  return (
    <div className="py-2 md:py-3 flex flex-col  gap-4 md:gap-5 w-full h-full items-start text-white-3 md:text-lg font-semibold">
      <NavMenuItem
        labelName={currentUser.username}
        Icon={ProfileIcon}
        routeName={routes.userProfile()}
      />
      <div className="flex gap-4 md:gap-5 px-3 py-2 items-center justify-start hover:bg-black-3 hover:bg-opacity-40 w-full rounded-md ">
        <img className="w-6" src={LogoutIcon} alt="FW - Logout" />
        <button onClick={logOut} className="text-red-normal">
          Logout
        </button>
      </div>
    </div>
  )
}

interface MenuItemProps {
  labelName: string
  Icon: string
  routeName: string
}

const NavMenuItem = (props: MenuItemProps) => {
  return (
    <Link
      to={props.routeName}
      className="flex gap-4 md:gap-5 px-3 py-2 items-center justify-start hover:bg-black-3 hover:bg-opacity-40 w-full rounded-md hover:text-primary-normal"
    >
      <img className="w-6" src={props.Icon} alt={'FW - ' + props.labelName} />
      <p className="w-full">{props.labelName}</p>
    </Link>
  )
}
