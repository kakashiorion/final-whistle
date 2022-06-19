import { Link, routes } from '@redwoodjs/router'
import logoText from 'public/Logo Text 3.png'
import logo from 'public/Main.png'

type LandingLayoutProps = {
  children?: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
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
    <>
      <div className="bg-black-2 bg-opacity-30 w-full absolute top-0 px-4 md:px-8 py-2">
        <Link to={routes.landing()}>
          <div className="gap-2 flex items-center justify-start px-8 ">
            <img className="h-6 md:h-8" src={logo} alt="logo" />
            <img className="h-6 md:h-8" src={logoText} alt="logo text" />
          </div>
        </Link>
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <div className="bg-secondary-normal h-10 w-full flex items-center justify-between px-4 md:px-8 py-6 md:py-8">
        <Link to={routes.landing()}>
          <img className="h-8" src={logoText} alt="logo text" />
        </Link>
        <img className="h-8" src={logo} alt="logo" />
        <p className="text-white-1 text-base md:text-lg">
          2022 Orion Labs Inc.
        </p>
      </div>
    </>
  )
}
