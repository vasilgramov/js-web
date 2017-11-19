import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class ExpenseCard extends Component {

    render() {
        const { id, name, category, cost, creationTime } = this.props
        console.log(id)
        return (
            <tr>
                <td>{name}</td>
                <td>{category}</td>
                <td>{cost}</td>
                <td>{creationTime}</td>
                <td>
                    <Link to={`/delete/${id}`} className="btn btn-secondary">Delete</Link>
                </td>
            </tr>
        )
    }
}

export default ExpenseCard