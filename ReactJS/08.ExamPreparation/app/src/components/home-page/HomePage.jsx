import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HotelList from './HotelList'
import { getPage, getAllHotels } from '../../api/remote'

class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hotels: [],
            allHotelsCount: 0
        }

        this.getAllHotels = this.getAllHotels.bind(this)
        this.getHotelsFromCurrentPage = this.getHotelsFromCurrentPage.bind(this)
    }

    async componentDidMount() {
        this.getAllHotels()
        this.getHotelsFromCurrentPage(Number(this.props.match.params.page) || 1)
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.match.params.page !== nextProps.match.params.page) {
            this.getHotelsFromCurrentPage(Number(nextProps.match.params.page) || 1)            
        }
    }

    async getAllHotels() {
        const allHotels = await getAllHotels()
        this.setState({ allHotelsCount: allHotels.length })
    }

    async getHotelsFromCurrentPage(page) {
        let data = await getPage(page)
        data = data.sort((h1, h2) => h1.id - h2.id)
        this.setState({ hotels: data })
    }

    render() {
        const page = Number(this.props.match.params.page) || 1

        return (
            <div>
                <h1>HomePage</h1>

                <HotelList
                    hotels={this.state.hotels}
                />

                <div className="pagination">
                    {page > 1 && <Link to={'/view/' + (page - 1)}>&lt;</Link>}
                    {Math.ceil(this.state.allHotelsCount / 10) >= page + 1 ? <Link to={'/view/' + (page + 1)}>&gt;</Link> : ''}
                </div>
            </div>
        )
    }
}

export default HomePage