import React, { Component } from 'react'
import Input from '../common/Input'
import { createHotel } from '../../api/remote'
import { withRouter } from 'react-router-dom'

class CreatePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            location: '',
            description: '',
            numberOfRooms: 0,
            image: '',
            parkingSlots: 0,
            error: false,
            submitting: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.isHotelValid = this.isHotelValid.bind(this)
        this.successfullyCreagingHotel = this.successfullyCreagingHotel.bind(this)
        this.getErrors = this.getErrors.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault()
        this.setState({ submitting: true })

        const hotel = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            numberOfRooms: Number(this.state.numberOfRooms),
            image: this.state.image,
            parkingSlots: Number(this.state.parkingSlots)
        }

        if (!this.isHotelValid(hotel)) {
            return
        }

        if (!await this.successfullyCreagingHotel(hotel)) {
            return
        }

        this.setState({ submitting: false })
        this.props.history.push('/')
    }

    async successfullyCreagingHotel(hotel) {
        const res = await createHotel(hotel)
        if (!res.success) {
            this.setState({ error: res, submitting: false })            
            return false
        }
        
        return true
    }

    isHotelValid(hotel) {
        const error = { message: '', errors: {} }
        if (hotel.description.length < 10) {
            error.message = 'Check the form for errors'
            error.errors.description = 'Description must be more than 10 symbols.'
        }
        if (isNaN(hotel.numberOfRooms) || hotel.numberOfRooms <= 0) {
            error.message = 'Check the form for errors'
            error.errors.numberOfRooms = 'Number of Rooms must be a positive number'
        }

        if (error.message) {
            this.setState({ error, submitting: false })
            return false
        }

        return true
    }

    getErrors() {
        let errors = null
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>
                    })}
                </div>
            )
        }

        return errors
    }

    render() {
        const errors = this.getErrors()

        return (
            <div className="container">
            <h1>Creat hotel</h1>
            {errors}
                <form onSubmit={this.onSubmit}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        label="Name: "
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        label="Location: "
                    />
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        label="Description: "
                    />
                    <Input
                        name="numberOfRooms"
                        type="number"
                        value={this.state.numberOfRooms}
                        onChange={this.onChange}
                        label="Number of rooms: "
                    />
                    <Input
                        name="image"
                        value={this.state.image}
                        onChange={this.onChange}
                        label="Image: "
                    />
                    <Input
                        name="parkingSlots"
                        type="number"
                        value={this.state.parkingSlots}
                        onChange={this.onChange}
                        label="Parking slots: "
                    />

                    <input type="submit" className="btn btn-primary" value="Create Hotel" disabled={this.state.submitting} />
                </form>
            </div>
        )
    }
}

export default CreatePage