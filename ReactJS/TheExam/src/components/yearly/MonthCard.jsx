import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MonthCard extends Component {

    render() {
        const { name, budget, balance, year, month } = this.props
        
        return (
            <div className="col-md-3">
                <div className="card text-white bg-secondary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <h2>{name}</h2>
                            <h4>Year {year}</h4>
                            <label htmlFor="budget">Budget:</label>
                            <input className="col-md-9" name="budget" value={budget} disabled />
                            <label htmlFor="balance">Balance:</label>
                            <input className="col-md-9" name="balance" value={balance} disabled />
                            <div className="space-top">
                                <Link to={`/monthly/${year}/${month}`} className="btn btn-secondary">Details</Link>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        )
    }
}

export default MonthCard