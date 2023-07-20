import { useState, useEffect, useRef } from 'react';
import { generate } from 'random-words';
import './Timer.css';

const NUMB_OF_WORDS = {
  easy: 1,
  medium: 20,
  hard: 100,
};

const TIMER_DURATION = {
  easy: 15,
  medium: 60,
  hard: 75,
};

function Practice() {
  const [words, setWords] = useState([]);
  const[totaltime,setTime]=useState(TIMER_DURATION.easy);
  const [countDown, setCountDown] = useState(TIMER_DURATION.easy);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty is set to 'easy'
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, [difficulty]);

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus();
    }
  }, [status]);

  function generateWords() {
    return new Array(NUMB_OF_WORDS[difficulty]).fill(null).map(() => generate());
  }

  function start() {
    if (status === 'finished') {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }
    // if(status ==="started")
    // { setWords(generateWords());
    //     setCurrWordIndex(0);
    //     setCurrCharIndex(-1);
    //   setCurrChar("");
    //   setCurrInput("");

    // }
    if (status !== 'started') {
      setStatus('started');
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus('finished');
            setCurrInput("");
            return TIMER_DURATION[difficulty];
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleDifficultyChange(event) {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);
    setTime(TIMER_DURATION[selectedDifficulty]);
    setCountDown(TIMER_DURATION[selectedDifficulty]);
  }

  function handleKeyDown({keyCode, key}) {
    // space bar 
    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
    // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } 
    else if(keyCode===13)
    {checkMatch();
        setWords(generateWords());
        setCurrWordIndex(0);
        setCurrCharIndex(-1);
      setCurrChar("");
      setCurrInput("");
    }
    else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'has-background-success'
      } else {
        return 'has-background-danger'
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'has-background-danger'
    } else {
      return ''
    }
  }

  return (
    <div className="Appsolo">
      <div className="section">
        <label className="label">Select Difficulty Level:</label>
        <div className="controldrop">
          <div className="select">
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input
          ref={textInput}
          disabled={status !== "started"}
          type="text"
          className="input"
          onKeyDown={handleKeyDown}
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>
          Start
        </button>
      </div>
      {status === 'started' && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                      )) }
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === 'finished' && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words per minute:</p>
              <p className="has-text-primary is-size-1">
                {(60*correct)/totaltime}
              </p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              {correct !== 0 ? (
                <p className="has-text-info is-size-1">
                  {Math.round((correct / (correct + incorrect)) * 100)}%
                </p>
              ) : (
                <p className="has-text-info is-size-1">0%</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Practice;