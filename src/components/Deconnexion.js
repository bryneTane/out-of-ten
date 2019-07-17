import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'antd';

import Header from './Header';
import Footer from './Footer';

import '../css/Deconnexion.css';

export default class Deconnexion extends Component{

    state = {
        user: {},
        cancel: false
    }
    componentWillMount(){
        if(localStorage.outoftenUser) this.setState({user: JSON.parse(localStorage.outoftenUser)});
    }

    disconnect(){
        delete localStorage.outoftenUser;
        this.setState({toggle: !this.state.toggle});
    }

    cancel(){
        this.setState({cancel: true});
    }

    render(){

        if(!localStorage.outoftenUser) return <Redirect to="/connexion" />

        if(this.state.cancel) return <Redirect to="/home" />
        
        return(
            <div>
                <Header data={this.state.user} />
                <div className='content'>
                    <img src={`${process.env.PUBLIC_URL}/img/cry.png`} alt="Disconnect ?" className='emoji' />
                    <div>Voulez vous vraiment fermer votre session ? </div>
                    <Button onClick={() => this.disconnect()} className='discButton' >Deconnexion</Button>
                    <Button onClick={() => this.cancel()} className='discButton' style={{backgroundColor: '#066422', color: '#ffffff'}} >Annuler</Button>
                </div>
                <Footer data={this.props.data} />
            </div>
        );
    }
}