import React, {Component} from 'react';
import { Form, TextField, SubmitField, FormEventsEmitter } from 'react-components-form';
import { Link } from 'react-router-dom';

const eventsEmitter = new FormEventsEmitter();

export default class Inscription extends Component {

    state = {
        id: false,
        username: false,
        email: false,
        password: false,
        confirm: false,
        message: "",
    };

    submitMethod(data) {
        if (data.id && data.password && data.username && data.email && data.confirm){
            if(data.password === data.confirm) console.log(data);
            else this.setState({
                confirm: true,
                message: "Les mots de passe doivent être identiques !",
            });
        }
        else this.setState({
            id: data.id ? false : true,
            username: data.username ? false : true,
            email: data.email ? false : true,
            password: data.password ? false : true,
            confirm: data.confirm ? false : true,
            message: "Veuillez remplir tous les champs !",
        });
    }

    render(){

        eventsEmitter.listen('modelChange', ({name, value}) => {
            // console.log('changeModel', name, value)
            if(this.state.id || this.state.username || this.state.email || this.state.password || this.state.confirm) this.setState({
                id: ((value && name==='form.id') || !this.state.id) ? false : true,
                username: ((value && name==='form.username') || !this.state.username) ? false : true,
                email: ((value && name==='form.email') || !this.state.email) ? false : true,
                password: ((value && name==='form.password') || !this.state.password) ? false : true,
                confirm: ((value && name==='form.confirm') || !this.state.confirm) ? false : true, 
            });
        });

        return(
            <div className="home">
                <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="/10" className="logo" />
                <span className="errorMessage">{this.state.message}</span>
                <h1>Inscription</h1>
                <Form
                    onSubmit={(model) => this.submitMethod(model)}
                    onError={(errors, data) => console.log('error', errors, data)}
                    className="form"
                >
                    <TextField name="id" label="Votre ID" type="text" className={"field" + (this.state.id ? " error" : "")} onClick={() => this.setState({id: false})} />
                    <TextField name="username" label="Votre nom d'utilisateur" type="text" className={"field" + (this.state.username ? " error" : "")} onClick={() => this.setState({username: false})} />
                    <TextField name="email" label="Votre email" type="email" className={"field" + (this.state.email ? " error" : "")} onClick={() => this.setState({email: false})} />
                    <TextField name="password" label="Votre mot de passe" type="password" className={"field" + (this.state.password ? " error" : "")} onClick={() => this.setState({password: false})} />
                    <TextField name="confirm" label="Confirmez votre mot de passe" type="password" className={"field" + (this.state.confirm ? " error" : "")} onClick={() => this.setState({confirm: false})} />
                    <SubmitField value="Inscription" className="submit" />
                </Form>
                <Link to={'/connexion'} className='linkConIns'>Déjà un compte? Connectez vous</Link>
            </div>
        );
    }
}