import './App.css';
import Practice from './components/practice/Practice';
import PlayeMode from './components/PlayerMode/PlayeMode';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import { Login } from './components/Login/Login';


function App() {
  return (
    <div className="App">
  <Router>
      <Routes>
          <Route path="/mode" element={<PlayeMode/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/solo" element={<Practice/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
