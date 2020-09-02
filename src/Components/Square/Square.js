import React from 'react';

export const Square = (props) => {
    return (
        <button
            className={props.squareStyle}
            onClick={props.handleClickSquare}
        >
            {props.value}
        </button>
    );
}