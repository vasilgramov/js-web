import React, { Component } from 'react';
import ContactList from './ContactList';
import Details from './Details';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchData from '../store/actions/fetchData';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedId: 0 };

        this.onContactClick = this.onContactClick.bind(this);
    }

    onContactClick(selectedId) {
        this.setState({ selectedId });
    }

    render() {
        const { ajaxCalls, contacts, fetchData } = this.props;

        return (
            <div id="book" className="box-large">
                <ContactList
                    contacts={contacts}
                    clickHandler={this.onContactClick}
                    selectedId={this.state.selectedId} />
                <Details user={contacts.filter(u => u.id === this.state.selectedId)[0]} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts,
        ajaxCalls: state.ajaxStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);