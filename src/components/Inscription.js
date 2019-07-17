import React, {Component} from 'react';
import { Form, TextField, SubmitField, FormEventsEmitter } from 'react-components-form';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

const eventsEmitter = new FormEventsEmitter();

export default class Inscription extends Component {

    state = {
        id: false,
        username: false,
        // email: false,
        password: false,
        confirm: false,
        message: "",
        connect: false
    };

    withoutAccent = (string) => string.replace(/[ùûü]/g,"u").replace(/[îï]/g,"i").replace(/[àâä]/g,"a").replace(/[ôö]/g,"o").replace(/[éèêë]/g,"e").replace(/ç/g,"c");

    submitMethod(data) {
        if (data.id && data.password && data.username /*&& data.email*/ && data.confirm){
            data.id = this.withoutAccent(data.id.toLowerCase().replace(" ", "_"));
            if(data.password === data.confirm) this.register(data);
            else this.setState({
                confirm: true,
                message: "Les mots de passe doivent être identiques !",
            });
        }
        else this.setState({
            id: data.id ? false : true,
            username: data.username ? false : true,
            // email: data.email ? false : true,
            password: data.password ? false : true,
            confirm: data.confirm ? false : true,
            message: "Veuillez remplir tous les champs !",
        });
    }

    register = (data) => {
        Axios.post('http://localhost:3010/api/register', {
          id: data.id,
          username: data.username,
          password: data.password
        })
        .then(resp => {
            console.log(resp);
            this.setState({connect: true})
        })
        .catch(err => {
            this.setState({message: "Cet Identifiant est déjà utilisé !"});
        })
      };

    render(){

        if(localStorage.outoftenUser) return <Redirect to="/home" />

        if(this.state.connect) return (<Redirect to={{
            pathname: '/connexion',
            state: {registered: true}
        }}/>);

        eventsEmitter.listen('modelChange', ({name, value}) => {
            // console.log('changeModel', name, value)
            if(this.state.id || this.state.username || this.state.email || this.state.password || this.state.confirm) this.setState({
                id: ((value && name==='form.id') || !this.state.id) ? false : true,
                username: ((value && name==='form.username') || !this.state.username) ? false : true,
                // email: ((value && name==='form.email') || !this.state.email) ? false : true,
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
                    {/* <TextField name="email" label="Votre email" type="email" className={"field" + (this.state.email ? " error" : "")} onClick={() => this.setState({email: false})} /> */}
                    <TextField name="password" label="Votre mot de passe" type="password" className={"field" + (this.state.password ? " error" : "")} onClick={() => this.setState({password: false})} />
                    <TextField name="confirm" label="Confirmez votre mot de passe" type="password" className={"field" + (this.state.confirm ? " error" : "")} onClick={() => this.setState({confirm: false})} />
                    <SubmitField value="Inscription" className="submit" />
                </Form>
                <Link to={'/connexion'} className='linkConIns'>Déjà un compte? Connectez vous</Link>
            </div>
        );
    }
}