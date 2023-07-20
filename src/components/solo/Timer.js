import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [totalTime, setTotalTime] = useState(60); // Default time is set to 60 seconds
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  useEffect(() => {
    setRemainingTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    const updateTimer = () => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      }
    };

    if (remainingTime > 0) {
      const intervalId = setInterval(updateTimer, 1000);
      setTimerIntervalId(intervalId);
    } else {
      clearInterval(timerIntervalId);
    }

    return () => clearInterval(timerIntervalId);
  }, [remainingTime, timerIntervalId]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setTotalTime(parseInt(inputValue, 10));
    clearInterval(timerIntervalId); // Stop the existing interval when totalTime changes
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Timer</h2>
      <div>
        <label>Set Time (seconds):</label>
        <input type="number" value={totalTime} onChange={handleInputChange} />
      </div>
      <p>Time Left: {formatTime(remainingTime)}</p>
    </div>
  );
};

export default Timer;
