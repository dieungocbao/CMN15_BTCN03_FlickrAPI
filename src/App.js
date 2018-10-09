import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Explore from './Components/Explore'
import Photo from './Components/Photo'
import Tag from './Components/Tag'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path="/" component={Explore} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/tags/:id" component={Tag}/>
        <Route exact path="/photos/:id" component={Photo} />
        </div>
      </Router>
    );
  }
}

export default App;
