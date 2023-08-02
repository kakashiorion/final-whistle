interface RoundedButtonProps {
  label: string
  onClick?: () => void
}

export const PrimaryRoundedButton = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-primary-dark rounded-full shadow-sm hover:shadow-primary-light px-4 py-2 bg-primary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const PrimaryRoundedButtonSmall = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-primary-dark rounded-full shadow-md px-3 py-1 bg-primary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-xs md:text-sm">{props.label}</p>
    </button>
  )
}

export const PrimaryRoundedButtonOutlined = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center shadow-sm hover:shadow-primary-light rounded-full hover:bg-primary-normal hover:text-white-1 px-4 py-2 bg-white-1 border-2 border-primary-normal text-primary-normal"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const PrimaryRoundedButtonDisabled = (props: RoundedButtonProps) => {
  return (
    <button className="flex items-center justify-center rounded-full px-4 py-2 bg-white-3 text-primary-normal ">
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}
