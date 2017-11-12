import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Article extends Component {

    constructor(props) {
        super(props)

        console.log(props)
    }

    render() {

        return (
            <article className="post">
                <div className="col rank">
                    <span>{this.props.props.key}</span>
                </div>
                <div className="col thumbnail">
                    <a href={this.props.props.url}>
                        <img src={this.props.props.imageUrl} />
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={this.props.props.url}>
                            {this.props.props.title}
                        </a>
                    </div>
                    <div className="details">
                        <div className="info">
                            submitted 1 day ago by {this.props.props.author}
                        </div>
                        <div className="controls">
                            <ul>
                                <li className="action"><a className="commentsLink" href="#">comments</a></li>
                                <li className="action"><a className="editLink" href="#">edit</a></li>
                                <li className="action"><Link to={'/delete/' + this.props.props._id } >delete</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </article>
        )
    }
}

export default Article