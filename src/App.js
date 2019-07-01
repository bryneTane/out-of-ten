import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import Home from './components/Home';


export default class App extends Component {

  render(){

    return (
      <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
        <Switch>
          <Route exact path='/' render={ () => <Redirect to={'/connexion'} /> } />
          <Route exact path='/connexion' component={Connexion} />
          <Route exact path='/inscription' component={Inscription} />
          <Route exact path='/home' component={Home} />
          {/* <Route exact path='/index.html' render={() => <Home stores={this.state.items}/>} /> */}
          {/* <Route component={ModalSwitch}/> */}
        </Switch>
      </BrowserRouter>
    );
  }
};
