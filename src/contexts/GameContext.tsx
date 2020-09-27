import React, { createContext, useReducer } from 'react'
import { calculateWinner } from '../util'

type HistoryItem = {
  squares: (string | null)[]
}

type GameState = {
  history: HistoryItem[],
  stepNumber: number,
  xIsNext: boolean
}

type GameAction = {
  type: string,
  step?: number,
  index?: number
}

export enum GameActionType {
  CLICK_SQUARE = 'CLICK_SQUARE',
  JUMP_TO = 'JUMP_TO'
}

const initialGameState = {
  history: [{
    squares: Array(9).fill(null)
  }],
  stepNumber: 0,
  xIsNext: true
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
      return state
  }
}

type GameContextType = {
  state: GameState,
  dispatch: React.Dispatch<GameAction>
}

export const gameContext = createContext({} as GameContextType)

export const GameProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)
  return (
    <gameContext.Provider value={{ state, dispatch }}>
      {children}
    </gameContext.Provider>
  )
}
