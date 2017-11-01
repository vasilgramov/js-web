import React, { Component } from 'react'

import leftArrow from '../resources/left.png'
import rightArrow from '../resources/right.png'

const episodeUrl = 'http://localhost:9999/episodePreview/'


class Slider extends Component {

    constructor() {
        super()

        this.state = {
            focusedEpisode: 0,
            imageUrl: ''
        }
    }

    componentDidMount() {
        fetch(episodeUrl + this.state.focusedEpisode)
            .then((data) => {

                return data.json()
            }).then((parsedData) => {

                this.setState({ imageUrl: parsedData.url })
            })
    }

    getNewEpisode = (id) => {
        fetch(episodeUrl + id)
            .then((data) => {

                return data.json()
            }).then((parsedData) => {
                this.setState({ imageUrl: parsedData.url })
            })
    }

    render() {
        return (
            <div className="warper">
                <img className="slider-button case-left" onClick={() => this.getNewEpisode(this.state.focusedEpisode--)} alt="leftArrow" src={leftArrow} />
                <img className="sliderImg" alt="episodeImage" src={this.state.imageUrl} />
                <img className="slider-button case-right" onClick={() => this.getNewEpisode(this.state.focusedEpisode++)} alt="rightArrow" src={rightArrow} />
            </div>
        )
    }
}

export default Slider
