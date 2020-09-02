import React from 'react';
// Components
import Board from '../Board/Board';
import { Status } from '../Status/Status';
import { MoveHistoryList } from '../MoveHistoryList/MoveHistoryList';
import { GameOver } from '../GameOver/GameOver';
import { ResetGame } from '../ResetGame/ResetGame';

export const GameRendering = (props) => {
    const history = props.history.slice(0, props.moveNum + 1);
    const currentSquares = 
    history[history.length - 1].squares.slice();
    const gameOver = (
        <GameOver
            winner={props.winner}
            resetGame={() => props.resetGame()}
        ></GameOver>
    );
    const resetGame = (
        <ResetGame
            text="Reset Game" 
            resetGame={() => props.resetGame()}
        ></ResetGame>
    );
    
    return (
        <div className="game">
                <div className="game-board">
                    <Board 
                        squares={currentSquares}
                        xIsNext={props.xIsNext} 
                        winner={props.winner} 
                        squaresStyle={props.squaresStyle} 
                        handleClickSquare={(i) => {
                            return props.handleClickSquare(i);
                        }}
                    />
                    {(props.winner || props.winner === false) ?
                     gameOver : resetGame} 
                </div>
                <div className="game-info">
                    <Status
                        xIsNext={props.xIsNext} 
                        winner={props.winner}
                    ></Status>
                    <MoveHistoryList
                        history={props.history}
                        sequence={props.sequence}
                        locations={props.locations}
                        ascendingOrder={props.ascendingOrder}
                        moveStyle={props.moveStyle}
                        jumpTo={(moveNum) => props.jumpTo(moveNum)}
                        toggleOrder={() => props.toggleOrder()}
                    ></MoveHistoryList>
                </div>
            </div>
    );
}