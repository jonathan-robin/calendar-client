import React from 'react';
import './sass/main.css';
import { BrowserRouter as Router, 
Route 
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
      <Router>
        <Route path="/" exact component={LandingPage} />
      </Router>
  )
}

export default App;
