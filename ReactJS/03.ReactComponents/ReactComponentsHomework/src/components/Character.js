import React, { Component } from 'react'

import observer from '../utils/observer'

class Character extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span onClick={() => (observer.executeFunc('changeId', this.props.data.id))} className="char-img">
                <img className="char-img" alt="characterImage" src={this.props.data.url} />
            </span>
        )
    }
}

export default Character