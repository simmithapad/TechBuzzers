import { useState, useEffect, useRef } from 'react';
import {io} from "socket.io-client";
import { generate } from 'random-words';
import "./Multi.css";
import { useParams } from 'react-router-dom';
function Multi(){
    const{username}=useParams();
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
    // const [username,setUsername]=useState("");
    const [socket, setSocket] = useState(null);
    const[opponent,setOpponent]=useState("");
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
    const [difficulty, setDifficulty] = useState("easy");

    const textInput = useRef(null);
    function start() {
        if (status === 'finished') {
        //   setWords(generateWords());
        //   setCurrWordIndex(0);
        //   setCorrect(0);
        //   setIncorrect(0);
        //   setCurrCharIndex(-1);
        //   setCurrChar("");

       
        }
        if (status !== 'started') {
          setStatus('started');
          let interval = setInterval(() => {
            setCountDown((prevCountdown) => {
              if (prevCountdown === 0) {
                clearInterval(interval);
                setStatus('finished');
                setCurrInput("");
                const socket = io('http://localhost:4000');
                setSocket(socket);
                console.log(correct);
                socket.emit('playing',{username:username,correct:correct,incorrect:incorrect,tataltime:totaltime,difficulty:difficulty})
                
                return TIMER_DURATION[difficulty];
              } else {
                return prevCountdown - 1;
              }
            });
          }, 1000);
        }
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
      function handleDifficultyChange(event) {
        const selectedDifficulty = event.target.value;
        setDifficulty(selectedDifficulty);
        setTime(TIMER_DURATION[selectedDifficulty]);
        setCountDown(TIMER_DURATION[selectedDifficulty]);
      }
      function generateWords() {
        return new Array(10).fill(null).map(() => generate());
      }
        useEffect(() => {
            console.log(correct);
            const socket = io('http://localhost:4000');
            setSocket(socket);
        
            socket.on('connect', () => {
              console.log('WebSocket connected');
            });
        
            socket.on("find",(e)=>{
            console.log(e.allPlayers);
            const objPlayer=e.allPlayers.find(obj=>obj.p1.p1name===username || obj.p2.p2name===username);
            console.log(objPlayer);
            objPlayer.p1.p1name===username ? setOpponent(objPlayer.p2.p2name): setOpponent(objPlayer.p1.p1name);
            setWords(generateWords());
            start();
        })
            socket.on("playing",(e)=>{
                const objPlayer=e.allPlayers.find(obj=>obj.p1.p1name===username || obj.p2.p2name===username);
                console.log(objPlayer.p1.p1speed);
                console.log(objPlayer.p2.p2speed);
            })
            socket.on('disconnect', () => {
              console.log('WebSocket disconnected');
            });
        
            return () => {
              socket.close();
            };
          }, [username]);
        
          const findPlayers = () => {
            // Send a message to the backend
            socket.emit('find', {username:username,difficulty:difficulty});
            console.log(username);
          };
          const seeResult=()=>{
          
          }
        
    return(
        <>
         <div className="Appmulti">
            {/* <input type="text" onChange={(e)=>setUsername(e.target.value)}>

            </input> */}
            <button onClick={findPlayers}>Join Game</button>
            <button onClick={seeResult}>Results</button>
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
            {/* <div>{opponent}</div> */}
            {/* <div>{opponent}</div> */}
            <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span key={idx}>{char}</span>
                      )) }
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="username">
      <a href="/">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {username}
    </a>
    <a href="/">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {opponent}
    </a>
    {/* <a href="/">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Username 3
    </a>
    <a href="/">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Username 4
    </a> */}
    </div>
  
        </div>
        </>
    )
}
export default Multi;