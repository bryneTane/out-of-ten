import React, {Component} from 'react';
import { Icon, Drawer } from 'antd';
import {Redirect} from 'react-router-dom';

import Source from '../tools/data';

import '../css/Header.css';


export default class Header extends Component {

    state={isOpenSideNav: false}
    
    storeDef;
    
    componentWillMount(){
        this.storeDef = Source.getDefs();
    }
    
    toggleSideNav = () => {
        this.setState({isOpenSideNav: !this.state.isOpenSideNav});
    }
    render(){

        return(
            <div className="header">
                <Drawer
                    placement="left"
                    width={'75%'}
                    closable={false}
                    maskClosable={true}
                    onClose={this.toggleSideNav}
                    zIndex={100000}
                    style={{padding: 0}}
                    visible={this.state.isOpenSideNav}
                    title={<div className="menuTitle">
                        <img src={`${process.env.PUBLIC_URL}/img/profile.png`} alt="profile image" className="profileImage" />
                        <span className="userName">Maureen Tueno</span>
                    </div>}
                >
                    {this.storeDef.menu.map((item, index) =>
                        <div className="menuItem" key={index} onClick={() => <Redirect to={item.link} />}>
                            <Icon type={item.icon} className="menuIcon" />
                            <span className="menuText">{item.title}</span>
                        </div>
                    )}
                </Drawer>
                <Icon type="menu" className="headerIcon" onClick={() => this.toggleSideNav()} />
                <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="/10" className="headerLogo"/>
                <Icon type="bell" className="headerIcon" theme="twoTone" twoToneColor="#ffffff" />
            </div>
        );
    }
}