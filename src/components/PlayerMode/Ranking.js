import React from 'react';
import './Ranking.css'; // Import the CSS file

const Ranking = () => {

  const players = [
    { id: 1, name: 'Player 1', score: 1000 },
      { id: 2, name: 'Player 2', score: 900 },
     { id: 3, name: 'Player 3', score: 800 },
     { id: 4, name: 'Player 4', score: 700 },
     { id: 5, name: 'Player 5', score: 600 },
   ];

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Player Ranking</h1>
      <ul className="ranking-list">
        {players.map((player, index) => (
          <li key={player.id} className="player-item">
            <span className="rank">{index + 1}</span>
            <span className="player-name">{player.name}</span>
            <span className="score">Score: {player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;

