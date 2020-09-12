import React from 'react';

export const Square = (props) => {
    return (
        <button
            className={props.squareStyle}
            id={props.id}
            onClick={props.handleClickSquare}
        >
            {props.value}
        </button>
    );
}