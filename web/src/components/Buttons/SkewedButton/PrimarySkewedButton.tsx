interface PrimarySkewedButtonProps {
  label: string
  onClick?: () => void
}

export const PrimarySkewedButton = (props: PrimarySkewedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[12deg] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-secondary-dark hover:shadow-lg shadow-md shadow-secondary-normal rounded px-6 md:px-8 py-3 md:py-4 bg-primary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="skew-x-[12deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const SmallPrimarySkewedButton = (props: PrimarySkewedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[12deg] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-secondary-dark hover:shadow-md shadow-sm shadow-secondary-normal rounded px-3 md:px-4 py-1.5 md:py-2 bg-primary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="skew-x-[12deg] text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const PrimarySkewedButtonOutlined = (
  props: PrimarySkewedButtonProps
) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[12deg] hover:-translate-y-1 rounded-md hover:-translate-x-1 hover:shadow-secondary-dark hover:shadow-lg shadow-md shadow-secondary-normal px-6 md:px-8 py-3 md:py-4 bg-white-1 border-2 border-primary-normal hover:bg-primary-normal hover:text-white-1 text-primary-normal"
      onClick={props.onClick}
    >
      <p className="skew-x-[12deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const PrimarySkewedButtonDisabled = (
  props: PrimarySkewedButtonProps
) => {
  return (
    <button className="flex items-center justify-center rounded-md -skew-x-[12deg] px-6 md:px-8 py-3 md:py-4 bg-white-3 text-primary-normal ">
      <p className="skew-x-[12deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}
