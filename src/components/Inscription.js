import React, {Component} from 'react';
import { Form, TextField, SubmitField } from 'react-components-form';
import { Link } from 'react-router-dom';

export default class Inscription extends Component {



    render(){

        return(
            <div className="home">
                <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="/10" className="logo" />
                <h1>Inscription</h1>
                <Form
                    onSubmit={model => console.log(model)}
                    onError={(errors, data) => console.log('error', errors, data)}
                    className="form"
                >
                    <TextField name="id" label="Votre ID" type="text" className="field" />
                    <TextField name="username" label="Votre nom d'utilisateur" type="text" className="field" />
                    <TextField name="email" label="Votre email" type="email" className="field" />
                    <TextField name="password" label="Votre mot de passe" type="password" className="field" />
                    <TextField name="confirmPassword" label="Confirmez votre mot de passe" type="password" className="field" />
                    <SubmitField value="Inscription" className="submit" />
                </Form>
                <Link to={'/connexion'} className='linkConIns'>Déjà un compte? Connectez vous</Link>
            </div>
        );
    }
}