import React, { Component } from 'react';

class DetailedContact extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <div className="info">
                    <div className="col">
                        <span className="avatar">&#9787;</span>
                    </div>
                    <div className="col">
                        <span className="name">{this.props.person.firstName}</span>
                        <span className="name">{this.props.person.lastName}</span>
                    </div>
                </div>
                <div className="info">
                    <span className="info-line">&phone; {this.props.person.phone}</span>
                    <span className="info-line">&#9993; {this.props.person.email}</span>
                </div>
            </div>
        );
    }
}

export default DetailedContact;