import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Connexion from './components/Connexion';


export default class App extends Component {

  render(){

    return (
      <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
        <Switch>
          <Route exact path='/' component={Connexion} />
          {/* <Route exact path='/index.html' render={() => <Home stores={this.state.items}/>} /> */}
          {/* <Route component={ModalSwitch}/> */}
        </Switch>
      </BrowserRouter>
    );
  }
};
