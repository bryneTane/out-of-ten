import React, {Component} from 'react';
import { Form, TextField, SubmitField, FormEventsEmitter } from 'react-components-form';
import {Link} from 'react-router-dom';

import '../css/Connexion.css';


const eventsEmitter = new FormEventsEmitter();

export default class Connexion extends Component {
    
    state = {
        login: false,
        password: false,
        message: "",
    };
    
    // personModel = {
        //     login: "",
        //     password: ""
        // }
    
    submitMethod(data) {
        if (data.login && data.password) console.log(data);
        else this.setState({
            login: data.login ? false : true,
            password: data.password ? false : true,
            message: "Veuillez remplir tous les champs !"
        });
    }
        
        
    render(){
            
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
                <span className="errorMessage">{this.state.message}</span>
                <h1>Connexion</h1>
                <Form
                    // model={this.personModel}
                    eventsEmitter={eventsEmitter}
                    onSubmit={(model) => this.submitMethod(model)}
                    // onError={(errors, data) => console.log('error', errors, data)}
                >
                    <TextField name="login" label="Votre ID ou email" type="text" className={"field" + (this.state.login ? " error" : "")} onClick={() => this.setState({login: false})} />
                    <TextField name="password" label=" Votre mot de passe" type="password" className={"field" + (this.state.password ? " error" : "")} onClick={() => this.setState({password: false})} />
                    <SubmitField value="Connexion" className="submit" />
                </Form>
                <Link to={'/inscription'} className='linkConIns'>Ou inscrivez vous</Link>
            </div>
        );
    }
}