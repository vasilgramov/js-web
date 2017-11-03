import React, { Component } from 'react'

import Input from './formFields/Input'

import observer from '../../utils/observer'

class PokemonForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pokemonName: '',
            pokemonImage: '',
            pokemonInfo: ''
        }

        this.submitCreate = this.submitCreate.bind(this)
        this.createPokemon = this.createPokemon.bind(this)
    }

    submitCreate(e) {
        e.preventDefault()

        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImage,
            pokemonInfo: this.state.pokemonInfo
        }

        this.createPokemon(payload)
    }

    createPokemon(payload) {

        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => {
            return res.json()
        })
        .then((d) => {
            // console.log('here')
            observer.executeFun('reRender')
        })
    }

    render() {
        return (
            <form onSubmit={this.submitCreate}>
                <fieldset>
                    <div className='App'>

                        <Input
                            type='text'
                            data='pokemon-name'
                            name='pokemon-name'
                            func={(e) => {
                                this.setState({ pokemonName: e.target.value })
                            }}
                            valid={true}
                        />

                        <Input
                            type='text'
                            data='pokemon-image'
                            name='pokemon-image'
                            func={(e) => {
                                this.setState({ pokemonImage: e.target.value })
                            }}
                            valid={true}
                        />

                        <Input
                            type='text'
                            data='pokemon-info'
                            name='pokemon-info'
                            func={(e) => {
                                this.setState({ pokemonInfo: e.target.value })
                            }}
                            valid={true}
                        />

                        <input
                            type='submit'
                            value='Create Pokemon'
                        />

                    </div>
                </fieldset>
            </form>
        )
    }
}

export default PokemonForm