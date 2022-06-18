import logoText from 'public/Logo Text 2.png'

type LandingLayoutProps = {
  children?: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center md:h-screen">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default LandingLayout

const Footer = () => {
  return (
    <>
      <div className="bg-primary-normal h-10 w-full flex items-center justify-between px-4 md:px-8 py-4">
        <img className="h-6" src={logoText} alt="logo text" />
        <p className="text-white-1 text-xs md:text-sm">2022 Orion Labs Inc.</p>
      </div>
    </>
  )
}
