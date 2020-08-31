import React from 'react';

export const ResetGame = (props) => {
    return (
        <div className="reset-game">
            <button 
                className="play-again"
                onClick={() => props.resetGame()}
            >{props.text}</button>
        </div>
    );
}