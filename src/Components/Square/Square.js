import React from 'react';

export const Square = (props) => {
    return (
        <button
            className={props.style}
            onClick={props.handleClickSquare}
        >
            {props.value}
        </button>
    );
}