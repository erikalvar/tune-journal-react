import React from 'react';
import './App.css';
import Nav from './Nav';
import SongIndex from './SongIndex';
import SongShow from './SongShow';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/song-index' exact component={SongIndex} />
          <Route path='/song-index/:id' exact component={SongShow} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App;
