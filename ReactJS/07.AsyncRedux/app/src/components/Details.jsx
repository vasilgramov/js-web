import React from 'react';
import { Link } from 'react-router-dom';


const Details = ({ user }) => (
    <div id="details">
        <h1>Details</h1>
        <div className="content">
            {!user && <p>Please select a contact from the list to view details</p>}
            {user && (
                <div>
                    <div className="info">
                        <div className="col">
                            <span className="avatar">&#9787;</span>
                        </div>
                        <div className="col">
                            <span className="name">{user.firstName}</span>
                            <span className="name">{user.lastName}</span>
                        </div>
                    </div>
                    <div className="info">
                        <span className="info-line">&#9742; {user.phone}</span>
                        <span className="info-line">&#9993; {user.email}</span>
                    </div>
                    <Link to={'/edit/' + user.id}>Edit</Link>
                </div>)}
        </div>
    </div>
);

export default Details;