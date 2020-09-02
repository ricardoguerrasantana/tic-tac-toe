import React from 'react';

import { Square } from '../Square/Square';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i} 
                value={this.props.squares[i]}
                squareStyle={this.props.squaresStyle[i]}
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
            <div>{this.generateBoard(3 , 3)}</div>
        );
    }
}

export default Board;