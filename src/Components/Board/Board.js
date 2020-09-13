import React from 'react';

import { Square } from '../Square/Square';

class Board extends React.Component {
    renderSquare(i) {
        const history = 
            this.props.history.slice(0, this.props.moveNum + 1);
        const currentSquares = 
            history[history.length - 1].squares.slice();

        return (
            <Square
                key={i} 
                id={`square ${i}`}
                value={currentSquares[i]}
                squareStyle={"square"}
                handleClickSquare={() => 
                    this.props.handleClickSquare(i)}
            />
        );
    }

    generateRow(numOfCols, row) {
        let i = row * numOfCols;
        const line = [];
        for (let col = 0; col < numOfCols; col++) {
            line.push(this.renderSquare(i++));
        }
        return line;
    }

    generateBoard(numOfCols , numOfRows) {
        const board = [];
        for (let row = 0 ; row < numOfRows ; row++) {
            board.push(
                <div 
                    key={`row${row}`}
                    className="board-row"
                >
                    {this.generateRow(numOfCols, row)}
                </div>
            );
        }
        return board;
    }    

    render() {
        return (
            <div>{this.generateBoard(this.props.col , this.props.row)}</div>
        );
    }
}

export default Board;