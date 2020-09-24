import React from 'react'
import { Square } from './Square'

type BoardProps = {
  squares: (string | null)[],
  onClick: (i: number) => void
}

const renderSquare = (props: BoardProps, i: number) => (
  <Square 
    value={props.squares[i]} 
    onClick={() => props.onClick(i)}
  />
)

export const Board = (props: BoardProps) => (
  <div>
    <div className="board-row">
      {renderSquare(props, 0)}
      {renderSquare(props, 1)}
      {renderSquare(props, 2)}
    </div>
    <div className="board-row">
      {renderSquare(props, 3)}
      {renderSquare(props, 4)}
      {renderSquare(props, 5)}
    </div>
    <div className="board-row">
      {renderSquare(props, 6)}
      {renderSquare(props, 7)}
      {renderSquare(props, 8)}
    </div>
  </div>
)
