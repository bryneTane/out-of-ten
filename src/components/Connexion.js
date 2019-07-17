import React, {Component} from 'react';
import { Form, TextField, SubmitField, FormEventsEmitter } from 'react-components-form';
import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';

import '../css/Connexion.css';


const eventsEmitter = new FormEventsEmitter();

export default class Connexion extends Component {
    
    state = {
        login: false,
        password: false,
        message: "",
        home: false,
    };
    
    // personModel = {
        //     login: "",
        //     password: ""
        // }
    
    submitMethod(data) {
        if (data.login && data.password) this.connect(data);
        else this.setState({
            login: data.login ? false : true,
            password: data.password ? false : true,
            message: "Veuillez remplir tous les champs !"
        });
    }
        
    connect = (data) => {
        Axios.post('http://localhost:3010/api/connect', {
          id: data.login,
          password: data.password
        })
        .then(resp => {
            console.log(resp);
            let data = resp.data;
            delete data.password;
            localStorage.outoftenUser = JSON.stringify(data);
            this.setState({home: true});
        })
        .catch(err => {
            this.setState({message: "Identifiant ou mot de passe incorrect"});
        })
      };

    componentDidMount(){
        delete this.props.location.state;
    }

    render(){

        if(this.state.home || localStorage.outoftenUser) return (<Redirect to={{pathname: '/home'}}/>);
            
        eventsEmitter.listen('modelChange', ({name, value}) => {
            // console.log('changeModel', name, value)
            if(this.state.login || this.state.password) this.setState({
                login: ((value && name==='form.login') || !this.state.login) ? false : true, 
                password: ((value && name==='form.password') || !this.state.password) ? false : true
            });
        });
        return(
            <div className="home">
                <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="/10" className="logo" />
                <span className="errorMessage">{this.state.message}</span><br/>
                {this.props.location.state && this.props.location.state.registered && <span className="successMessage">Vous avez bien été inscrit</span>}
                <h1>Connexion</h1>
                <Form
                    // model={this.personModel}
                    eventsEmitter={eventsEmitter}
                    onSubmit={(model) => this.submitMethod(model)}
                    // onError={(errors, data) => console.log('error', errors, data)}
                >
                    <TextField name="login" label="Votre ID" type="text" className={"field" + (this.state.login ? " error" : "")} onClick={() => this.setState({login: false})} />
                    <TextField name="password" label=" Votre mot de passe" type="password" className={"field" + (this.state.password ? " error" : "")} onClick={() => this.setState({password: false})} />
                    <SubmitField value="Connexion" className="submit" />
                </Form>
                <Link to={'/inscription'} className='linkConIns'>Ou inscrivez vous</Link>
            </div>
        );
    }
}