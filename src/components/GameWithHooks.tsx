import React, { useReducer } from 'react'
import { Board } from './Board'

type Square = string | null

type HistoryItem = {
  squares: Square[]
}

type GameState = {
  history: HistoryItem[],
  stepNumber: number,
  xIsNext: boolean
}

const initialGameState = {
  history: [{
    squares: Array(9).fill(null)
  }],
  stepNumber: 0,
  xIsNext: true
}

type GameAction = {
  type: string,
  step?: number,
  index?: number
}

enum GameActionType {
  CLICK_SQUARE = 'CLICK_SQUARE',
  JUMP_TO = 'JUMP_TO'
}

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case GameActionType.CLICK_SQUARE:
      const current = state.history[state.stepNumber]
      const squares = current.squares.slice()
      const winner = calculateWinner(squares)
      if (winner || squares[action.index!]) {
        return state
      }
      squares[action.index!] = state.xIsNext ? 'X' : 'O'
      const nextStep = state.stepNumber + 1
      return {
        history: state.history.slice(0, nextStep).concat([{
          squares
        }]),
        stepNumber: nextStep,
        xIsNext: !state.xIsNext
      }
    case GameActionType.JUMP_TO:
      return {
        ...state,
        stepNumber: action.step!,
        xIsNext: action.step! % 2 === 0
      }
    default:
      throw new Error()
  }
}

export const GameWithHooks = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  const current = state.history[state.stepNumber]
  const winner = calculateWinner(current.squares)
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
      status = `Next player: ${state.xIsNext ? 'X' : 'O'}`
      break
  }

  const moves = state.history.map((_, move: number) => {
    const desc = move
      ? `Go to move #${move}`
      : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => dispatch({type: GameActionType.JUMP_TO, step: move})}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => dispatch({type: GameActionType.CLICK_SQUARE, index: i})}
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
