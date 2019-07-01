import React, {Component} from 'react';
import { Icon } from 'antd';

import '../css/Header.css';


export default class Header extends Component {

    render(){

        return(
            <div className="header">
                {/*fake header*/}
                <Icon type="menu" className="headerIcon" />
                <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="/10" className="headerLogo"/>
                <Icon type="bell" className="headerIcon" theme="twoTone" twoToneColor="#ffffff" />
            </div>
        );
    }
}