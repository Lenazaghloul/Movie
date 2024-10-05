import React from 'react';
import './input.scss';

const Input = (props) => {
    return (
        <input
            type={props.type} // Default type to "text"
            placeholder={props.placeholder}
            value={props.value} // Ensure it's always a string
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    );
}

export default Input;
