import React, { Component } from 'react';
import DieuHuongURL from './router/DieuHuongURL';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from './Components/Menu';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Menu></Menu>
        <DieuHuongURL />
        </div>
      </Router>
    );
  }
}

export default App;
