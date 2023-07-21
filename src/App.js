import './App.css';
import Practice from './components/practice/Practice';
import PlayeMode from './components/PlayerMode/PlayeMode';
import Ranking from './components/PlayerMode/Ranking';
import FlipCard from './components/multi/FlipCard';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";

import { Login } from './components/Login/Login';


function App() {

  return (
    <div className="App">
      {/* <h1>Multiplayer Game Ranking</h1>
      <Ranking players={players} /> */}
  <Router>
      <Routes>
          <Route path="/mode" element={<PlayeMode/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/solo" element={<Practice/>}/>
          <Route path="/Lobby" element={<FlipCard/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
