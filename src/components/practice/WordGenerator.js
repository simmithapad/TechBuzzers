import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WordGenerator = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateRandomWord();
  }, []);

  const generateRandomWord = () => {
    axios.get('https://random-word-api.herokuapp.com/word?number=1').then((response) => {
      setCurrentWord(response.data[0]);
    });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUserInput(value);

    if (value === currentWord) {
      setScore((prevScore) => prevScore + 1);
      setUserInput('');
      generateRandomWord();
    }
  };

  useEffect(() => {
    // Focus on the input field when the component mounts
    const inputElement = document.getElementById('typing-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <div>
      <h1>Typing Game</h1>
      <p>Type the word:</p>
      <h2>{currentWord}</h2>
      <input
        id="typing-input"
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing..."
      />
      <p>Score: {score}</p>
    </div>
  );
};

export default WordGenerator;
