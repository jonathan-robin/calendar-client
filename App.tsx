import React from 'react';
import './sass/main.css';
import { BrowserRouter as Router, 
Route 
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SignIn from './pages/commons/Login/SignIn';
import Login from './pages/commons/Login/Login';

function App() {
  return (
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/login" exact component={Login} />
      </Router>
  )
}

export default App;
