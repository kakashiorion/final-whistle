interface SecondarySkewedButtonProps {
  label: string
  onClick?: () => void
}

export const SecondarySkewedButton = (props: SecondarySkewedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[24deg] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-primary-dark hover:shadow-lg shadow-sm shadow-primary-normal rounded-md px-6 py-4 bg-secondary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="skew-x-[24deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const SecondarySkewedButtonOutlined = (
  props: SecondarySkewedButtonProps
) => {
  return (
    <button
      className="flex items-center justify-center -skew-x-[24deg] hover:-translate-y-2 rounded-md hover:-translate-x-2 hover:shadow-primary-dark hover:shadow-lg shadow-sm shadow-primary-normal px-6 py-4 bg-white-1 border-2 border-secondary-normal text-secondary-normal"
      onClick={props.onClick}
    >
      <p className="skew-x-[24deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}

export const SecondarySkewedButtonDisabled = (
  props: SecondarySkewedButtonProps
) => {
  return (
    <button className="flex items-center justify-center -skew-x-[24deg] px-6 py-4 rounded-md bg-white-3 text-secondary-normal ">
      <p className="skew-x-[24deg] text-base md:text-xl">{props.label}</p>
    </button>
  )
}
