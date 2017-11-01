import React, { Component } from 'react'

class Character extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span className="char-img">
                <img className="char-img" alt="characterImage" src={this.props.image} />
            </span>
        )
    }
}

export default Character