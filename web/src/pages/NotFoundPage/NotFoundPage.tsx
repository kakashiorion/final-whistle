import { back } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { PrimarySkewedButton } from 'src/components/Buttons/SkewedButton/PrimarySkewedButton'

export default () => {
  return (
    <>
      <MetaTags
        title="Welcome"
        description="Official landing page for Final Whistle - the football prediction game"
      />
      <ErrorBanner />
    </>
  )
}

const ErrorBanner = () => {
  const errorText = 'Seems like you are lost!'
  const navigateBack = () => {
    back()
  }
  return (
    <div className="w-full bg-white-1 md:h-full flex flex-col items-start justify-center gap-5 md:gap-8 px-8 py-24 md:py-16">
      <p className="font-semibold text-secondary-normal text-lg md:text-2xl">
        404... Page not found!
      </p>
      <h1 className="text-primary-normal text-3xl md:text-5xl font-extrabold text-left">
        {errorText}
      </h1>
      <div className="px-4">
        <PrimarySkewedButton label="Go Back" onClick={navigateBack} />
      </div>
      <div className="w-5/6 h-2 md:h-3 bg-primary-normal"></div>
    </div>
  )
}
