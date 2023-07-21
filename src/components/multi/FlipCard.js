import React, { useState } from 'react';
import './FlipCard.css'

export default function FlipCard() {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const min = 100000; // Minimum six-digit number
    const max = 999999; // Maximum six-digit number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
  };

  return (
    <>
     <div className="flip">
      <div className="front" /*style="background-image: url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)"*/>
       <h1 className="text-shadow">Create Team</h1>
       <p>Get a generated code and share with your friends to create your own team</p>
      </div>
     <div className="back">
       <button className="generate" onClick={generateRandomNumber}>Generate Code</button>
      {randomNumber && <p>{randomNumber}</p>}
      <input type="text" placeholder="Enter your code"/>
      <button className = "play" type="submit">Play</button>
     </div>
    </div>
<div className="flip">
    <div className="front" /*style="background-image: url(https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)"*/>
       <h1 className="text-shadow">Join Team</h1>
       <p>Choose a difficulty level and join a team of same level with random people</p>
    </div>
    <div className="back">
    <button className = "play" type="submit">Play</button>
    </div>
</div>

    </>
  )
}

