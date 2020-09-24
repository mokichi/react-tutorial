import React, { useState } from 'react'
import { Board } from './Board'

type Square = string | null

type HistoryItem = {
  squares: Square[]
}

export const GameWithHooks = () => {
  const [history, setHistory] = useState<HistoryItem[]>([{
    squares: Array<Square>(9).fill(null)
  }])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  const handleClick = (i: number) => {
    const squares = current.squares.slice()
    if (winner || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    const nextStep = stepNumber + 1
    setHistory(history.slice(0, nextStep).concat([{
      squares
    }]))
    setStepNumber(nextStep)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const moves = history.map((_, move: number) => {
    const desc = move
      ? `Go to move #${move}`
      : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status: string
  switch (winner) {
    case 'X':
    case 'O':
      status = `Winner: ${winner}`
      break
    case 'D':
      status = 'Draw'
      break
    default:
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
      break
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares: Square[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every(v => v)) {
    return 'D'
  }
  return null;
}
