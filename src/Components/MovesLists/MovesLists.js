import React from 'react';

export const MoveHistoryList = (props) => {
    const moves = props.history.map((move, step) => {
        let textButton;
        let textLocation;
        if (!step) {
            textButton = `Start the game`;
        } else {
            // Get last marked position (i)
            const sequence = props.sequence.slice();
            const i = sequence[step - 1];
            // Show the location of the last marked position
            textLocation = `${move.squares[i]} marks location 
            (C:${props.locations[i].col} , 
            R:${props.locations[i].row})`;
            // Text of the last step's button
            textButton = `Go back to move #${step}`;
        }
        return (
            <li key={step}>
                <p>{textLocation}</p>
                <button 
                // Action to take back the game to 
                // the specified move
                onClick={() => props.onClick(step)}
                >
                {textButton}
                </button>
                <hr></hr>
            </li>
        );
    });

    return (<ol>{moves}</ol>);
}