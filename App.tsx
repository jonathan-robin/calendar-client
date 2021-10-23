import React,{useEffect, useContext} from 'react';
import { AuthProvider } from './context/GlobalState';
import './sass/main.css';
import { BrowserRouter as Router, 
Route, 
HashRouter
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SignIn from './pages/Login/SignIn';
import Login from './pages/Login/Login';
import Home from './pages/home/Home';
import useAxios from './hooks/useAxios';
import { AuthContext } from './context/GlobalState';
import { AxiosPromise, AxiosResponse, AxiosResponseHeaders } from 'axios';


export interface ServerResponseToken{
    accessToken:'string', 
    refreshToken:'string'
}


function App() {
  const [authState, setAuthState] = useContext(AuthContext)

  return (
    <AuthProvider>
      <HashRouter>
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
      </Router>
      </HashRouter>
    </AuthProvider>
  )
}

export default App;
