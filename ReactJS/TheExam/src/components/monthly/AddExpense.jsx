import React, { Component } from 'react'
import { addNewExpense } from '../../api/remote'
import { withRouter } from 'react-router-dom'

import toastr from 'toastr'

class AddExpense extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            category: 'Non-essential',
            cost: 0,
            date: 0
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('auth-token') == null) {
            this.props.history.push('/login')
            return
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault()

        const year = this.props.match.params.year
        const month = this.props.match.params.month

        const date = this.state.date
        const name = this.state.name
        const category = this.state.category
        const amount = this.state.cost

        const res = await addNewExpense(year, month, Number(date), name, category, Number(amount))

        if (res.success) {
            this.props.history.push('/yearly')
            toastr.success('Added expensive!')
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <h3>November 2017</h3>
                    </div>
                </div>

                <div className="row space-top">
                    <div className="col-md-10">

                        <form onSubmit={this.onSubmit}>
                            <legend>Add a new expense</legend>

                            <div className="form-group">
                                <label className="col-md-2" htmlFor="name">Name:</label>
                                <input onChange={this.onChange} className="col-md-2" name="name" type="text" />
                            </div>

                            <div className="form-group">
                                <label className="col-md-2" htmlFor="category">Category:</label>
                                <select onChange={this.onChange} className="col-md-2 pl-2" name="category">
                                    <option>Non-essential</option>
                                    <option>Fixed</option>
                                    <option>Variable</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="col-md-2" htmlFor="cost">Cost:</label>
                                <input onChange={this.onChange} className="col-md-2" name="cost" type="number" />
                            </div>

                            <div className="form-group">
                                <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                                <input onChange={this.onChange} className="col-md-2" name="date" type="text" />
                            </div>

                            <input type="submit" className="btn btn-secondary" value="Add" />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddExpense)