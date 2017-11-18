import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({ id, name, location, image, del, canDelete }) {
    return (
        <article className="hotelCard">
            <img alt={image} src={image} />
            <p>{name} in {location}</p>
            <Link to={'/details/' + id}>View Details</Link>
            {canDelete && <a href="javascript:void(0)" onClick={del}>Delete</a>}
        </article>
    )
}