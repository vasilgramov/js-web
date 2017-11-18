import React, { Component } from 'react'
import HotelCard from './HotelCard'

class HotelList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.hotels.map(h => (
                    <HotelCard
                        key={h.id}
                        id={h.id}
                        name={h.name}
                        location={h.location}
                        image={h.image}
                        canDelete={h.id % 2 == 0}
                        del={() => this.props.deleteHotel(h.id)}
                    />
                ))}
            </div>
        )
    }
}

export default HotelList