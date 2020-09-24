import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './components/Game'
import { GameWithHooks } from './components/GameWithHooks'
import './index.css';

ReactDOM.render(
  <div style={{display: 'flex', gap: '20px'}}>
    <div>
      <h2>Game</h2>
      <Game />
    </div>
    <div>
      <h2>Game with Hooks</h2>
      <GameWithHooks />
    </div>
    <div>
      <h2>Game with Redux</h2>
      TODO
    </div>
  </div>,
  document.getElementById('root')
);
