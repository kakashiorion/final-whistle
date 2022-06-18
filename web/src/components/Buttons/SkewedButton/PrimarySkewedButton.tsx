interface PrimarySkewedButtonProps {
  label: string
  onClick?: () => void
}

export const PrimarySkewedButton = (props: PrimarySkewedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[24deg] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-secondary-dark hover:shadow-lg shadow-sm shadow-secondary-normal rounded-md px-6 py-4 bg-primary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="skew-x-[24deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const PrimarySkewedButtonOutlined = (
  props: PrimarySkewedButtonProps
) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[24deg] hover:-translate-y-2 rounded-md hover:-translate-x-2 hover:shadow-secondary-dark hover:shadow-lg shadow-sm shadow-secondary-normal px-6 py-4 bg-white-1 border-2 border-primary-normal text-primary-normal"
      onClick={props.onClick}
    >
      <p className="skew-x-[24deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const PrimarySkewedButtonDisabled = (
  props: PrimarySkewedButtonProps
) => {
  return (
    <button className="flex items-center justify-center rounded-md -skew-x-[24deg] px-6 py-4 bg-white-3 text-primary-normal ">
      <p className="skew-x-[24deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}
