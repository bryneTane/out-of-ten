import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import { RingLoader as Loader } from 'halogenium';
import Source from './tools/data';
// import logo from './logo.svg';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import Home from './components/Home';

import './App.css';
import 'antd/dist/antd.css';



export default class App extends Component {

  state = { store: [], isLoading: true };

  componentWillMount(){
    fetch(`${process.env.PUBLIC_URL}/store.json`)
            .then(resp => resp.json())
            .then(resp => {
                Source.setDefs(resp);
                console.log(resp);
                this.setState({ store: resp, isLoading: false});
            })
            .then()
            .catch(err => {
                console.log(err);
            });
  }

  render(){
    if(this.state.isLoading) return(
      <div>
        <div className="header">
          {/*fake header*/}
          <Icon type="menu" className="headerIcon" />
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="/10" className="headerLogo"/>
          <Icon type="bell" className="headerIcon" theme="twoTone" twoToneColor="#ffffff" />
        </div>
        <div className="loader">
          <Loader color="#066422" size="50%" className="load" />
        </div>
      </div>
    );

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
