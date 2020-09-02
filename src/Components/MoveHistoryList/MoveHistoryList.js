import React from 'react';

export const MoveHistoryList = (props) => {
    const moves = props.history.map((move, moveNum) => {
        // Get last marked position (i)
        const sequence = props.sequence.slice();
        const i = sequence[moveNum];
        console.log(moveNum, i , sequence, move); 
        const text = (!moveNum ? <span>Game Start</span> : 
            <span>move #{moveNum} - <b>{move.squares[i]}</b> (
            {props.locations[i].col} , 
            {props.locations[i].row})</span>);
        return (
            <li key={moveNum}
                className={props.moveStyle[moveNum]}
            >
                <button 
                    className={props.moveStyle[moveNum]}
                    /**
                    Action to take back the game to the 
                    specified move 
                    */
                    onClick={() => props.jumpTo(moveNum)}
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