import React, { useContext } from 'react'
import { Board } from './Board'
import { gameContext, GameProvider, GameActionType } from '../contexts/GameContext'
import { calculateWinner } from '../util'

const Game = () => {
  const { state, dispatch } = useContext(gameContext)

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
        <button onClick={() => dispatch({ type: GameActionType.JUMP_TO, step: move })}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => dispatch({ type: GameActionType.CLICK_SQUARE, index: i })}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export const GameWithHooks = () => (
  <GameProvider>
    <Game />
  </GameProvider>
)
