import React, { Component } from 'react'
import Character from './Character'

class Detail extends Component {

    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div>
                <fieldset>
                    <Character image={'https://avatarfiles.alphacoders.com/889/88985.png'} />
                    <p>SomeText</p>
                </fieldset>
            </div>
        )
    }
}

export default Detail