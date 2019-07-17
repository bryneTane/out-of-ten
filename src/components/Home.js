import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default class Home extends Component{

    state = {
        user: {},
    }
    componentWillMount(){
        this.setState({user: JSON.parse(localStorage.outoftenUser)});
    }

    render(){

        if(!localStorage.outoftenUser) return <Redirect to="/connexion" />
        
        return(
            <div>
                <Header data={this.state.user} />
                <Footer data={this.props.data} />
            </div>
        );
    }
}