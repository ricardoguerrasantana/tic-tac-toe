import React from 'react';
// Components
import Board from '../Board/Board';
import MoveHistoryList from '../MoveHistoryList/MoveHistoryList';
import { Status } from '../Status/Status';
import { GameOver } from '../GameOver/GameOver';
import { ResetGame } from '../ResetGame/ResetGame';
import { PlayerName } from '../PlayerName/PlayerName';

export const GameRendering = (props) => {
    const history = props.history.slice(0, props.moveNum + 1);
    const currentSquares = 
    history[history.length - 1].squares.slice();
    const gameOver = (
        <GameOver
            winnersResult={props.winnersResult}
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
                        col={props.col} 
                        row={props.row} 
                        squares={currentSquares}
                        xIsNext={props.xIsNext} 
                        winnersResult={props.winnersResult} 
                        handleClickSquare={(i) => {
                            return props.handleClickSquare(i);
                        }}
                    />
                    {(props.winnersResult.winner || props.winnersResult.winner === false) ?
                     gameOver : resetGame} 
                </div>
                <div className="game-info">
                    <PlayerName
                        playerMark={"X"}
                        player={props.player}
                        changePlayerName={(e, playerMark) => {
                            return props.changePlayerName(e, playerMark);
                        }}
                    ></PlayerName>
                    <PlayerName
                        playerMark={"O"}
                        player={props.player}
                        changePlayerName={(e, playerMark) => {
                            return props.changePlayerName(e, playerMark);
                        }}
                    ></PlayerName>
                    <Status
                        xIsNext={props.xIsNext} 
                        winnersResult={props.winnersResult}
                    ></Status>
                    <MoveHistoryList
                        history={props.history}
                        sequence={props.sequence}
                        moveNum={props.moveNum}
                        locations={props.locations}
                        toggleMoveHistoryList={props.toggleMoveHistoryList}
                        jumpTo={(moveNum) => props.jumpTo(moveNum)}
                        toggleOrder={(key) => props.toggleOrder(key)}
                    ></MoveHistoryList>
                </div>
            </div>
    );
}