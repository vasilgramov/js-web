import React, { Component } from 'react'

import constants from '../utils/constants'
import Article from './Article'

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch('https://baas.kinvey.com/appdata/' + constants.appKey + '/posts?query={}&sort={"_kmd.ect": -1}', {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token') 
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({ posts: data })
        })
    }

    render() {
        return(
            <section id="viewCatalog">
                <div className="posts">

                {
                    this.state.posts.map((p, i) => {
                        p.key = i + 1

                        return <Article key={i} props={p} /> 
                    })
                }

                </div>
        </section>
        )
    }
}

export default Main