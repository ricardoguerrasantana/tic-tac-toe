import React from 'react';

export const Status = (props) => {
    let status;
    if (props.winnersResult.winner) {
        status = (<p><b>** Habemus Winner **</b></p>);
    } else if (props.winnersResult.winner === false){
        status = (<p>Draw</p>);
    } else {
        status = (<p>Next player: 
        <b className={`player${props.xIsNext ? 'X' : 'O'}-color`}>
        {props.xIsNext ? 'X' : 'O'}</b></p>);
    }
    return (<div className="status">{status}</div>);
}