import React from 'react';
import Contact from './Contact';

const ContactList = ({ contacts, selectedId, clickHandler }) => {
    return (
        <div id="list">
            <h1>Contacts</h1>
            <div className="content">
                {contacts.map(c => (
                    <Contact
                        selected={c.id === selectedId}
                        key={c.id}
                        firstName={c.firstName}
                        lastName={c.lastName}
                        onClick={() => clickHandler(c.id)}/>
                ))}
            </div>
        </div>
    );
};

export default ContactList;