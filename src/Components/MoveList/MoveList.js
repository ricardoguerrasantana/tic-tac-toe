import React from 'react';

export const MoveHistoryList = (props) => {
    const moves = props.history.map((move, step) => {
        // Get last marked position (i)
        const sequence = props.sequence.slice();
        const i = sequence[step - 1];
        const text = (!step ? <span>Game Start</span> : 
            <span>move #{step} - <b>{move.squares[i]}</b> (
            {props.locations[i].col} , 
            {props.locations[i].row})</span>);
        return (
            <li key={step}
                className="item"
            >
                <button 
                // Action to take back the game to 
                // the specified move
                onClick={() => props.jumpTo(step)}
                >
                {text}
                </button>
            </li>
        );
    });

    return (
        <div>
            <button
                className="toggle" 
                onClick={() => props.toggleOrder()}
            >
                Toggle the List Order
            </button>
            <p>Move number - Player - <br />
            Location (column, Row)</p>
            <ol>
            {props.ascendingOrder ? 
            moves : moves.slice().reverse()}
            </ol>
            <p>Press to go back to any <br /> 
            move and continue playing</p>
        </div>
    );
}