import React from 'react';
// Components
import Board from '../Board/Board';
import { Status } from '../Status/Status';
import { MoveHistoryList } from '../MovesLists/MovesLists';

export const GameRendering = (props) => {
    const history = props.history;
    const currentSquares = 
    history[history.length - 1].squares.slice();
    
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
                </div>
                <div className="game-info">
                    <Status
                        xIsNext={props.xIsNext} 
                        winner={props.winner}
                    ></Status>
                    <button
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