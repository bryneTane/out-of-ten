import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import Source from '../tools/data';

import '../css/Footer.css';


export default class Footer extends Component {

    storeDef;

    componentWillMount(){
        this.storeDef = Source.getDefs();
    }

    render(){

        // console.log(this.storeDef)

        return(
            <div className="footer">
                {this.storeDef.footer.map((item, index) => 
                <div className="footerElt" key={index}>
                    <Icon type={item.icon} onClick={()=><Redirect to={item.link} />} className="navIcon" />
                    <br/>
                    <span className="iconTitle" onClick={()=><Redirect to={item.link} />}>{item.title}</span>
                </div>)}
            </div>
        );
    }
}