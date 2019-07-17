import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to={item.link} ><Icon type={item.icon} className="navIcon" /></Link>
                    <br/>
                    <Link to={item.link} ><span className="iconTitle" >{item.title}</span></Link>
                </div>)}
            </div>
        );
    }
}