import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import constants from '../utils/constants'

class DeleteArticle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fireRedirect: false
        }
    }

    componentDidMount() {

        console.log(this.props.match.params.id)

        fetch('https://baas.kinvey.com/appdata/' + constants.appKey + '/posts/' + this.props.match.params.id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
            },
        }).then((success) => {
            return success.json()
        }).then((data) => {
            this.setState({ fireRedirect: true })
        })
    }

    render() {

        if (this.state.fireRedirect) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div>
                Deleting...
            </div>
        )
    }
}

export default DeleteArticle