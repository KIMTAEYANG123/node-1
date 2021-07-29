
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {

  return (
    <Router>
      <div >
        <NavBar/>
        <Switch>
          
          {/* 깔끔하게 쓰려면 이런식으로 씀 */}
          <Route  exact path ="/" component={LandingPage}/> 

          <Route  path ="/login" component={LoginPage}/>

          <Route  path ="/registry" component={RegisterPage}/>

        </Switch>
      </div>
    </Router>  
  );
}

export default App;
