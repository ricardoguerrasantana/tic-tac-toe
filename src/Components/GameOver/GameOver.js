import React from 'react';
import { ResetGame } from '../ResetGame/ResetGame';

export const GameOver = (props) => {
    let text;
    if (props.winnersResult.winner) {  
        const playerMark = 
        getPlayerMarkByName(props.players, props.winnersResult.winner);
        text = (
        <div>
            <h1>*<span className={`player${playerMark}-color`}>
            {props.winnersResult.winner}</span>*</h1>
            <h2>Winner</h2>
        </div>
        );
    } else {
        text = (
            <h1>Draw!</h1>
        );
    }
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

function getPlayerMarkByName(object, name) {
    return Object.keys(object).find(key => object[key].name === name);
}