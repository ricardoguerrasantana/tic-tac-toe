import React from 'react';

export const MoveHistoryList = (props) => {
    const moves = props.history.map((move, step) => {
        let textButton;
        let textLocation;
        if (!step) {
            textButton = `Start the game`;
        } else {
            // Get last marked position 
            const sequence = move.sequence.slice();
            const i = sequence[sequence.length - 1];
            // Show location or last marked position
            textLocation = `${move.squares[i]} marks location 
            (C:${move.locations[i][0]} , 
            R:${move.locations[i][1]})`;
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