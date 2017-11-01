import React, { Component } from 'react'
import Character from './Character'

const allCharacters = 'http://localhost:9999/roster'

class Roster extends Component {

    constructor() {
        super()

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch(allCharacters)
            .then((data) => {
                return data.json()
            }).then((parsedData) => {

                this.setState({ data: parsedData })
            })
    }

    render() {
        return (
            <div>
                {this.state.data.map((data, index) => {
                    return <Character key={index} image={data.url} />
                })}
            </div>
        )
    }
}

export default Roster