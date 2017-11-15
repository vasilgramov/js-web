import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateContact } from '../store/actions/postData';
import {Redirect} from 'react-router-dom';

class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.firstName || '',
            lastName: props.lastName || '',
            phone: props.phone || '',
            email: props.email || '',
            updated: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            let contact = this.props.contacts.filter(c => c.id === this.props.match.params.id)[0];
            if (contact) {
                this.setState({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                    email: contact.email
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id) {
            let contact = nextProps.contacts.filter(c => c.id === nextProps.match.params.id)[0];
            if (contact) {
                this.setState({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                    email: contact.email
                });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const p = this.props.updateContact(this.props.match.params.id, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email
        });
        p.then(this.setState({ updated: true } ));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.updated) {
            this.setState({updated: false});
            return (<Redirect to="/" />);
        }

        return (
            <div className="box-large">
                <h1>My Profile</h1>
                <div className="content">
                    <div className="info">
                        <div className="col centered">
                            <span className="avatar">&#9787;</span>
                            <button>Change</button>
                        </div>
                        <div className="col">
                            <form className="profile-editor" onSubmit={this.onSubmit}>
                                <label>First name:</label>
                                <input name="firstName" type="text" value={this.state.firstName} onChange={this.onChange} /><br />
                                <label>Last name:</label>
                                <input name="lastName" type="text" value={this.state.lastName} onChange={this.onChange} /><br />
                                <label>Phone:</label>
                                <input name="phone" type="text" value={this.state.phone} onChange={this.onChange} /><br />
                                <label>E-mail:</label>
                                <input name="email" type="text" value={this.state.email} onChange={this.onChange} /><br />
                                <input type="submit" value="Save changes" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateContact: (id, contact) => dispatch(updateContact(id, contact))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);