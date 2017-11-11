import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header>
                <span className="logo">☃</span><span className="header">SeenIt</span>
                
                {
                    localStorage.getItem('token') ? 
                    <div id="profile"><span>{localStorage.getItem('username')}</span>|<Link to='/logout'>logout</Link></div> 
                    : 
                    ''
                }

            </header>
        );
    }
}

export default Header;
