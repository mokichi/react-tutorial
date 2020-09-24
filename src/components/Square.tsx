import React from 'react'

type SquareProps = {
  value: string | null,
  onClick: () => void
}

export const Square = (props: SquareProps) => (
  <button 
    className="square"
    onClick={props.onClick}
  >
    {props.value}
  </button>
)
