import React from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ firstName, lastName, selected, onClick }) => {
    const style = {};
    if (selected) {
        style.backgroundColor = '#d59450';
        style.color = 'white';
    }

    return (
        <div className="contact" data-id="id" style={style} onClick={onClick}>
            <span className="avatar small">&#9787;</span>
            <span className="title">{firstName} {lastName}</span>
        </div>
    );
};
export default Contact;