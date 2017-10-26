import React, { Component } from 'react';

class Contact extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div onClick={() => this.props.func(this.props.person.index)} className="contact" data-id={this.props.person.id}  >
                <span className="avatar small">&#9787;</span>
                <span className="title">{this.props.person.firstName} {this.props.person.lastName}</span>
            </div>
        );
    }
}



export default Contact;