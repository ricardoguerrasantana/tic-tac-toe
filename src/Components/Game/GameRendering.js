import React from 'react';
// Components
import Board from '../Board/Board';
import { Status } from '../Status/Status';
import { MoveHistoryList } from '../MovesLists/MovesLists';
import { GameOver } from '../GameOver/GameOver';
import { ResetGame } from '../ResetGame/ResetGame';

export const GameRendering = (props) => {
    const history = props.history;
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
                        styles={props.styles} 
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
                    <button
                        className="toggle" 
                        onClick={() => props.toggleOrder()}
                    >
                        Toggle the List Order
                    </button>
                    <MoveHistoryList
                        history={props.history}
                        sequence={props.sequence}
                        locations={props.locations}
                        ascendingOrder={props.ascendingOrder}
                        jumpTo={(step) => props.jumpTo(step)}
                    ></MoveHistoryList>
                </div>
            </div>
    );
}