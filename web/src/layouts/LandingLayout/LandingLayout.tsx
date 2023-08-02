import { useEffect } from 'react'

import logoText from 'public/Logo Text 1.png'
import logo from 'public/Main 2.png'

import { Link, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type LandingLayoutProps = {
  children?: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home(), { replace: true })
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="flex flex-col items-center justify-start">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default LandingLayout

const Header = () => {
  return (
    <div className="absolute top-0 px-6 md:px-8 py-8 md:py-10">
      <Link
        to={routes.landing()}
        className="gap-2 md:gap-3 flex items-center justify-start"
      >
        <img className="h-6 md:h-9" src={logo} alt="logo" />
        <img className="h-7 md:h-10" src={logoText} alt="logo text" />
      </Link>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="bg-black-1 w-full flex flex-col gap-4 items-center justify-start px-6 md:px-8 py-12 md:py-16">
      {/* <img className="h-8 md:h-9" src={logo} alt="logo" /> */}
      <Link to={routes.landing()}>
        <img className="h-8 md:h-9" src={logoText} alt="logo text" />
      </Link>
      <p className="text-white-1 text-xs md:text-sm">2023 Orion Labs Inc.</p>
    </div>
  )
}
