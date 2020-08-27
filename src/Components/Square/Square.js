import React from 'react';

export const Square = (props) => {
    return (
        <button
            className={props.style}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}