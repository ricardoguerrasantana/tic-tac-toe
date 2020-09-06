import React from 'react';

export const Status = (props) => {
    let status;
    if (props.winnersResult.winner) {
        status = `** Habemus Winner **`;
    } else if (props.winnersResult.winner === false){
        status = `Draw`;
    } else {
        status = `Next player: 
        ${props.xIsNext ? 'X' : 'O'}`;
    }
    return (<div className="status">{status}</div>);
}