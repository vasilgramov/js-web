import React, { Component } from 'react'
import { deleteExpensive } from '../../api/remote' 
import { withRouter } from 'react-router-dom'

import toastr from 'toastr'

class DeleteExpensive extends Component {

    async componentDidMount() {
        if (localStorage.getItem('auth-token') == null) {
            this.props.history.push('/login')
            return
        }

        console.log(this.props.match.params.id)
        const res = await deleteExpensive(this.props.match.params.id)
        
        if (res.success) {
            this.props.history.push('/yearly')
            toastr.success('Deleted expensive!')
        }
    }

    render() {
        return (
            <div>
                Deleting...
            </div>
        )
    }
}

export default withRouter(DeleteExpensive)