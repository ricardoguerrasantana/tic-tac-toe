import React from 'react';
import { ResetGame } from '../ResetGame/ResetGame';

export const GameOver = (props) => {
    const text = props.winner ? 
        <DisplayWinner winner={props.winner}/> : 
        <DisplayDraw/>;
    return (
        <div className="game-over">
            {text}
            <ResetGame
                text="Play Again"
                resetGame={() => props.resetGame()}
            ></ResetGame>
        </div>
    );
}

const DisplayDraw = () => {
    return (<h1>Draw!</h1>);
}

const DisplayWinner = (props) => {
    return (
        <div>
            <h1>*{props.winner}*</h1>
            <h2>Winner</h2>
        </div>
    );
}