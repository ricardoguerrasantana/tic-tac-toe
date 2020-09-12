import React from 'react';
// Components
import Board from '../Board/Board';
import MoveHistoryList from '../MoveHistoryList/MoveHistoryList';
import { Status } from '../Status/Status';
import { GameOver } from '../GameOver/GameOver';
import { ResetGame } from '../ResetGame/ResetGame';
import { PlayerSettings } from '../PlayerSettings/PlayerSettings';

export const GameRendering = (props) => {
    const history = props.history.slice(0, props.moveNum + 1);
    const currentSquares = 
    history[history.length - 1].squares.slice();
    const gameOver = (
        <GameOver
            players={props.players}
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
        <div className="game-heading">
            <PlayerSettings
                playerMark={"X"}
                players={props.players}
                changePlayerName={(e, playerMark) => {
                    return props.changePlayerName(e, playerMark);
                }}
                changeColor={(playerMark) => 
                    props.changeColor(playerMark)}
            ></PlayerSettings>
            <PlayerSettings
                playerMark={"O"}
                players={props.players}
                changePlayerName={(e, playerMark) => {
                    return props.changePlayerName(e, playerMark);
                }}
                changeColor={(playerMark) => 
                    props.changeColor(playerMark)}
            ></PlayerSettings>
        </div>
        <div className="game-body">
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
                <Status
                    xIsNext={props.xIsNext} 
                    winnersResult={props.winnersResult}
                ></Status>
                <MoveHistoryList
                    history={props.history}
                    sequence={props.sequence}
                    moveNum={props.moveNum}
                    locations={props.locations}
                    toggleMoveHistoryList=
                        {props.toggleMoveHistoryList}
                    jumpTo={(moveNum) => props.jumpTo(moveNum)}
                    toggleOrder={(key) => props.toggleOrder(key)}
                ></MoveHistoryList>
            </div>
        </div>
    </div>
    );
}