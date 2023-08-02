interface SecondarySkewedButtonProps {
  label: string
  onClick?: () => void
}

export const SecondarySkewedButton = (props: SecondarySkewedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[12deg] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-primary-dark hover:shadow-lg shadow-md shadow-primary-normal rounded px-6 md:px-8 py-3 md:py-4 bg-secondary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="skew-x-[12deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const SmallSecondarySkewedButton = (
  props: SecondarySkewedButtonProps
) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[12deg] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-primary-dark hover:shadow-md shadow-sm shadow-primary-normal rounded px-3 md:px-4 py-1.5 md:py-2 bg-secondary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="skew-x-[12deg] text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const SecondarySkewedButtonOutlined = (
  props: SecondarySkewedButtonProps
) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[12deg] hover:-translate-y-1 rounded-md hover:-translate-x-1 hover:shadow-primary-dark hover:shadow-lg shadow-md shadow-primary-normal px-6 md:px-8 py-3 md:py-4 border-2 border-secondary-normal hover:bg-secondary-normal bg-white-1 hover:text-white-1 text-secondary-normal"
      onClick={props.onClick}
    >
      <p className="skew-x-[12deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const SecondarySkewedButtonDisabled = (
  props: SecondarySkewedButtonProps
) => {
  return (
    <button className="flex items-center justify-center -skew-x-[12deg] px-6 md:px-8 py-3 md:py-4 rounded-md bg-white-3 text-secondary-normal ">
      <p className="skew-x-[12deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}
