import React, { Component } from 'react';

class Input extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { name, type = 'text', value, onChange, label } = this.props;
        
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} />
            </div>
        );
    }
}

export default Input