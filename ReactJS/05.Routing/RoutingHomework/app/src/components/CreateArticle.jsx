import React, { Component } from 'react'

import NavigationBar from './NavigationBar'

class CreateArticle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: '',
            title: '',
            image: '',
            comment: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        // author title url imageUrl description

        let data = {
            
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />

                <section id="viewSubmit">
                    <div class="submitArea">
                        <h1>Submit Link</h1>
                        <p>Please, fill out the form. A thumbnail image is not required.</p>
                    </div>
                    <div class="submitArea formContainer">
                        <form onSubmit={this.onSubmit} id="submitForm" class="submitForm">
                            <label>Link URL:</label>
                            <input onChange={this.onChange} name="url" type="text" />

                            <label>Link Title:</label>
                            <input onChange={this.onChange} name="title" type="text" />

                            <label>Link Thumbnail Image (optional):</label>
                            <input onChange={this.onChange} name="image" type="text" />

                            <label>Comment (optional):</label>
                            <textarea onChange={this.onChange} name="comment"></textarea>

                            <input id="btnSubmitPost" value="Submit" type="submit" />
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

export default CreateArticle