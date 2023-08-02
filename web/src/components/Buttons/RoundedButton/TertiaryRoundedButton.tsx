interface RoundedButtonProps {
  label: string
  onClick?: () => void
}

export const TertiaryRoundedButton = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-tertiary-dark rounded-full shadow-md px-4 py-2 bg-tertiary-normal text-white-1"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const TertiaryRoundedButtonOutlined = (props: RoundedButtonProps) => {
  return (
    <button
      className="flex items-center justify-center shadow-md rounded-full hover:bg-tertiary-normal hover:text-white-1 px-4 py-2 bg-white-1 border-2 border-tertiary-normal text-tertiary-normal"
      onClick={props.onClick}
    >
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}

export const TertiaryRoundedButtonDisabled = (props: RoundedButtonProps) => {
  return (
    <button className="flex items-center justify-center rounded-full px-4 py-2 bg-white-3 text-tertiary-normal ">
      <p className="text-sm md:text-base">{props.label}</p>
    </button>
  )
}
