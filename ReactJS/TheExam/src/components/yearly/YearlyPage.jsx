import React, { Component } from 'react'
import { yearlyPlan } from '../../api/remote'
import MonthCard from './MonthCard'
import { withRouter } from 'react-router-dom'

class YearlyPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            months: {}
        }
    }

    async componentDidMount() {
        if (localStorage.getItem('auth-token') == null) {
            this.props.history.push('/login')
            return
        }

        const res = await yearlyPlan()

        this.setState({ months: res })
    }

    render() {

        const monthsNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]

        const months = []
        
        for (let property in this.state.months) {
            months.push(this.state.months[property])
        }

        let date = new Date()
        let year = date.getFullYear()

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Yearly Balance</h1>
                    </div>
                </div>

                <div className="row space-top col-md-12">
                    {
                        months.map((m, i) => {
                            return <MonthCard
                                key={i}
                                name={monthsNames[i]}
                                balance={m.balance}
                                budget={m.budget}
                                year={year}
                                month={i + 1}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(YearlyPage)