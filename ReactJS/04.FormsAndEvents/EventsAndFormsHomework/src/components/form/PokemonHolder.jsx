import React, { Component } from 'react'
import Pokemon from './formFields/PokemonField'

import observer from '../../utils/observer'

class PokemonHolder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pokemons: []
        }

        this.reRender = this.reRender.bind(this)

        fetch('http://localhost:5000/pokedex/pokedex')
            .then((data) => {
                return data.json()
            })
            .then((parsedData) => {
                this.setState({
                    pokemons: parsedData.pokemonColection
                })
            })
    }

    componentDidMount() {
        observer.addFunc('reRender', this.reRender)
    }

    reRender() {
        console.log('rerendering')
        
        fetch('http://localhost:5000/pokedex/pokedex')
            .then((data) => {
                return data.json()
            })
            .then((parsedData) => {
                this.setState({
                    pokemons: parsedData.pokemonColection
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.pokemons.map((data, index) => {

                    return <Pokemon key={index} data={data} />
                })}
            </div>
        )
    }
}

export default PokemonHolder