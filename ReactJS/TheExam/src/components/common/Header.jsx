import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import toastr from 'toastr'

class Header extends Component {

    constructor(props) {
        super(props)

        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        localStorage.clear()
        this.props.history.push('/')
        toastr.success('Logged out!')
    }

    render() {
        const loggedIn = localStorage.getItem('auth-token')
        const name = localStorage.getItem('name')

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink to="/monthly/2017/11" className="nav-link" activeClassName="active">Monthly Balance</NavLink>}
                                {loggedIn && <NavLink to="/yearly" className="nav-link" activeClassName="active">Yearly Balance</NavLink>}

                                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={this.onLogout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)