import React from 'react';

import { Square } from '../Square/Square';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i} 
                value={this.props.squares[i]}
                style={this.props.styles[i]}
                handleClickSquare={() => this.props.handleClickSquare(i)}
            />
        );
    }

    render() {
        const squares = [];
        for (let i = 0; i < this.props.squares.length; i) {
            const rowOfSquares = [];
            for (let j = 0 ; j < 3; j++) {
                const square = this.renderSquare(i++);
                rowOfSquares.push(square);
            }
            squares.push(
                <div 
                    key={`col${(i + 3) / 2}`}
                    className="board-row"
                >
                {rowOfSquares}
                </div>
            );
        }

        return (
            <div>{squares}</div>
        );
    }
}

export default Board;