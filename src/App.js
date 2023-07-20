import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './App.css';
//import Timer from './components/solo/Timer';
 import {Login} from './components/Login/Login';
// import Dropdown from './components/solo/Dropdown';
import PlayerMode from './components/PlayerMode/PlayerMode';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/mode" element={<PlayerMode/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
