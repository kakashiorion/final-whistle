interface RoundedButtonProps {
  label: string
  onClick?: () => void
}

export const RedRoundedButton = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-red-dark rounded-full shadow-md px-4 py-2 bg-red-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const RedRoundedButtonSmall = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-red-dark rounded-full shadow-md px-3 py-1 bg-red-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-xs md:text-sm">{props.label}</p>
    </button>
  )
}

export const RedRoundedButtonOutlined = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center shadow-md rounded-full hover:bg-red-normal hover:text-white-1 px-4 py-2 bg-white-1 border-2 border-red-normal text-red-normal"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const RedRoundedButtonDisabled = (props: RoundedButtonProps) => {
  return (
    <button className="flex items-center justify-center rounded-full px-4 py-2 bg-white-3 text-red-normal ">
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}
