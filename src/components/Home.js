import React, {Component} from 'react';

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

        console.log(this.state.user)
        
        return(
            <div>
                <Header data={this.state.user} />
                <Footer data={this.props.data} />
            </div>
        );
    }
}