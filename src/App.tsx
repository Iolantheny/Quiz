import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/themes/default/theme.scss';
import Home from './pages/Home';
import Technologia from './pages/Technologia';
import Kultura from './pages/Kultura';
import Motoryzacja from './pages/Motoryzacja';
import Programowanie from './pages/Programowanie';
import Historia from './pages/Historia';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Technologia" component={Technologia} />
          <Route exact path="/Kultura" component={Kultura} />
          <Route exact path="/Motoryzacja" component={Motoryzacja} />
          <Route exact path="/Programowanie" component={Programowanie} />
          <Route exact path="/Historia" component={Historia} />
        </Switch>
      </Router>
    );
  };
}

export default App;
