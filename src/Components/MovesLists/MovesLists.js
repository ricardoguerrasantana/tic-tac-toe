import React from 'react';

export const MoveHistoryList = (props) => {
    let lastMoveSquares = Array(9).fill(null);
    const moves = props.history.map((move, step) => {
        let textButton;
        let textLocation;
        if (!step) {
            textButton = `Start the game`;
        } else {
            // Find the index for the last square marked
            const currentMoveSquares = move.squares.slice();
            const i = move.squares.findIndex((square, index) => {
                return square !== lastMoveSquares[index];
            });
            lastMoveSquares = currentMoveSquares;
            textLocation = `${move.squares[i]} marks location 
            (${move.locations[i][0]} , ${move.locations[i][1]})`;
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
            </li>
        );
    });

    return (<ol>{moves}</ol>);
}