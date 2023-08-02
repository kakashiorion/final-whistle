interface RoundedButtonProps {
  label: string
  onClick?: () => void
}

export const SecondaryRoundedButton = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-secondary-dark rounded-full shadow-md px-4 py-2 bg-secondary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const SecondaryRoundedButtonSmall = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-secondary-dark rounded-full shadow-md px-3 py-1 bg-secondary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-xs md:text-sm">{props.label}</p>
    </button>
  )
}

export const SecondaryRoundedButtonOutlined = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center shadow-md rounded-full hover:bg-secondary-normal hover:text-white-1 px-4 py-2 bg-white-1 border-2 border-secondary-normal text-secondary-normal"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const SecondaryRoundedButtonDisabled = (props: RoundedButtonProps) => {
  return (
    <button className="flex items-center justify-center rounded-full px-4 py-2 bg-white-3 text-secondary-normal ">
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}
