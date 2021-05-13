import {Route} from 'react-router-dom';
import Register from './pages/Register'
import Nav from './components/Nav'
import './App.css';
import Login from './pages/Login';
import Create from './pages/Create';

import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className="screen">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/Create" component={Create} />
        <Route exact path="/" component={Home} />
      </div>
    </div>
  );
}

export default App;
