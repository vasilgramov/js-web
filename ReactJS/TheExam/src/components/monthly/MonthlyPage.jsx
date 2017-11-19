import React, { Component } from 'react'

import { getPlanYearMonth, updatePlanYearMoth } from '../../api/remote'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import ExpenseCard from './ExpenseCard'

import toastr from 'toastr'

class MonthlyPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            balance: 0,
            budget: 0,
            expenses: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        if (localStorage.getItem('auth-token') == null) {
            this.props.history.push('/login')
            return
        }

        let year = this.props.match.params.year
        let month = this.props.match.params.month
        const res = await getPlanYearMonth(year, month)

        this.setState({
            balance: res.income,
            budget: res.budget,
            expenses: res.expenses
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault()

        let year = this.props.match.params.year
        let month = this.props.match.params.month

        const res = await updatePlanYearMoth(year, month, Number(this.state.balance), Number(this.state.budget))
        if (res.success) {
            this.props.history.push('/yearly')
            toastr.success('Updated budget successfully!')
        }
    }

    render() {

        const monthsNames = [
            '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]

        const year = this.props.match.params.year
        const month = this.props.match.params.month

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Budget Planner</h1>
                    </div>
                </div>
                <div className="row space-top ">
                    <div className="col-md-12 ">
                        <div className="card bg-secondary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <h2 id="month">{monthsNames[month]} {year}</h2>
                                    <div className="row">
                                        <div className="col-md-3 space-top">
                                            <h4>Planner</h4>

                                            <form onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="income">Income:</label>
                                                    <input onChange={this.onChange} value={this.state.balance} className="form-control" name="balance" type="number" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="budget">Budget:</label>
                                                    <input onChange={this.onChange} value={this.state.budget} className="form-control" name="budget" type="number" />
                                                </div>

                                                <input type="submit" className="btn btn-secondary" value="Save" />
                                            </form>

                                        </div>
                                        <div className="col-md-8 space-top">
                                            <div className="row">
                                                <h4 className="col-md-9">Expenses</h4>
                                                <Link to={`/addExpense/${year}/${month}`} className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
                                            </div>

                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Cost</th>
                                                        <th>Payment Date</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        this.state.expenses.map((e, i) => {
                                                            return <ExpenseCard
                                                                key={i}
                                                                id={e.id}
                                                                name={e.name}
                                                                category={e.category}
                                                                cost={e.amount}
                                                                creationTime={e.creationTime}
                                                            />
                                                        })
                                                    }

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MonthlyPage)