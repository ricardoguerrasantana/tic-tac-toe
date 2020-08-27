import React from 'react';

import { calculateWinner } from '../../util/helpers';
import { styleWinnerLine } from '../../util/helpers';

import Board from '../Board/Board';

import { MoveHistoryList } from '../MovesLists/MovesLists';
import { Status } from '../Status/Status';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            xIsNext: true,
            winner: null,
            sequence: [],
            locations: [
                {col: 1, row: 1},
                {col: 2, row: 1},
                {col: 3, row: 1},
                {col: 1, row: 2},
                {col: 2, row: 2},
                {col: 3, row: 2},
                {col: 1, row: 3},
                {col: 2, row: 3},
                {col: 3, row: 3},
            ],
            ascendingOrder: true,
            styles: Array(9).fill("square"),
        });

        this.handleClick = this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    handleClick(i) {
        // Make an immutable copy of the last set of games's moves
        const history = this.state.history.slice();
        const currentSquares = 
        history[history.length - 1].squares.slice();
        // Disable the move if there is a winner 
        // or if the square's been marked
        if (this.state.winner || currentSquares[i]) {
            return;
        }
        //Assign the porper value for the clicked square
        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';
        // Make an immutable copy of the sequence of 
        // the marked positions
        const sequence = 
        this.state.sequence.slice();
        //Determine if there is a winner due the last move 
        const winner = calculateWinner(currentSquares);
        let styles = this.state.styles;
        if (winner) {
            styles = styleWinnerLine(currentSquares, styles, "square", "highlighted-square");
        }
        this.setState({
            // Add the last set of game's moves to the array 
            // which track game's moves (unlike push() method, 
            // concat() method doesn't muatate the 
            // original array)
            history: history.concat(
                [
                    {
                        squares: currentSquares,
                    }
                ]
                ),
            xIsNext: !this.state.xIsNext,
            winner: winner,
            sequence: sequence.concat([i]),
            styles: styles,
        });
    }

    jumpTo(step) {
        // Reset the game to the indicated step
        const currentHistory = 
        this.state.history.slice(0, step + 1);
        const currentSquares = 
        currentHistory[currentHistory.length - 1].squares.slice();
        const winner = calculateWinner(currentSquares);
        const currentSequence = this.state.sequence.slice(0, step);
        let styles = this.state.styles;
        styles = styleWinnerLine(currentSquares, styles, "square", "highlighted-square");
        this.setState({
            history: currentHistory, 
            // !(step % 2) this is: because X starts 
            // first (step 0) it is even, then module of 
            // a even number is 0, evaluated as false which 
            // is turned to the opposite by 
            // the Logical NOT operator (!) 
            xIsNext: !(step % 2), 
            winner: winner,
            sequence: currentSequence,
            styles: styles,
        });
    }

    toggleOrder() {
        this.setState({
            ascendingOrder: this.state.ascendingOrder ? false : true
        });
    }

    render() {
        const history = this.state.history;
        const currentSquares = 
        history[history.length - 1].squares.slice();
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={currentSquares}
                        xIsNext={this.state.xIsNext} 
                        winner={this.state.winner} 
                        styles={this.state.styles} 
                        onClick={(i) => {
                            return this.handleClick(i);
                        }}
                    />
                </div>
                <div className="game-info">
                    <Status
                        xIsNext={this.state.xIsNext} 
                        winner={this.state.winner}
                    ></Status>
                    <button
                        onClick={() => this.toggleOrder()}
                    >
                        Toggle the List Order
                    </button>
                    <MoveHistoryList
                        history={this.state.history}
                        sequence={this.state.sequence}
                        locations={this.state.locations}
                        ascendingOrder={this.state.ascendingOrder}
                        onClick={(step) => this.jumpTo(step)}
                    ></MoveHistoryList>
                </div>
            </div>
        );
    }
}

export default Game;