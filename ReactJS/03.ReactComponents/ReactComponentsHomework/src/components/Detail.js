import React, { Component } from 'react'
import Character from './Character'

import observer from '../utils/observer'

const characterData = 'http://localhost:9999/character/'

class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: 'https://avatarfiles.alphacoders.com/889/88985.png',
            bio: "Rick Sanchez is the co-eponymous main character and leading protagonist of the show. He is a genius scientist whose alcoholism and reckless, nihilistic behavior are a source of concern for his daughter's family, as well as the safety of their son, Morty. He is voiced by Justin Roiland."
        }

        this.changeFocus = (id) => {
            fetch(characterData + id)
                .then((data) => {
                    return data.json()
                }).then((parsedData) => {
                    this.setState({
                        url: parsedData.url,
                        bio: parsedData.bio
                    })
                })
        }
    }

    componentDidMount() {
        observer.addFunc('changeId', this.changeFocus)
    }

    render() {
        return (
            <div>
                <fieldset>
                    <Character data={this.state} />
                    <p>{this.state.bio}</p>
                </fieldset>
            </div>
        )
    }
}

export default Detail