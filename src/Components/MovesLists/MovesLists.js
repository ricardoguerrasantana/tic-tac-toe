import React from 'react';

export const MovesList = (props) => {
    const moves = props.history.map((game, move) => {
        let text;
        if (!move) {
            text = `Start the game`;
        } else {
            text = `Go back to move #${move}`;
        }
        return (
            <li key={move}>
                <button 
                // Action to take back the game to 
                // the specified move
                onClick={() => props.onClick(move)}
                >
                {text}
                </button>
            </li>
        );
    });

    return (<ol>{moves}</ol>);
}