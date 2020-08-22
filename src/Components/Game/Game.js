import React from 'react';

import { calculateWinner } from '../../util/helpers';

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
                    sequence: [],
                    locations: Array(9).fill(Array(2).fill(null))
                }
            ],
            xIsNext: true,
            winner: null
        });

        this.handleClick = this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    handleClick(i , col , row) {
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
        const currentSequence = 
        history[history.length - 1].sequence.slice();
        const currentLocations = 
        history[history.length - 1].locations.slice();
        currentLocations[i] = [col , row];
        //Determine if there is a winner due the last move 
        const winner = calculateWinner(currentSquares);
        this.setState({
            // Add the last set of game's moves to the array 
            // which track game's moves (unlike push() method, 
            // concat() method doesn't muatate the 
            // original array)
            history: history.concat(
                [
                    {
                        squares: currentSquares,
                        sequence: currentSequence.concat([i]),
                        locations: currentLocations
                    }
                ]
            ),
            xIsNext: !this.state.xIsNext,
            winner: winner
        });
    }

    jumpTo(step) {
        // Reset the game to the indicated step
        const history = this.state.history.slice(0, step + 1);
        const currentSquares = 
        history[history.length - 1].squares.slice();
        const winner = calculateWinner(currentSquares);
        this.setState({
            history: history, 
            // !(step % 2) this is: because X starts 
            // first (step 0) it is even, then module of 
            // a even number is 0, evaluated as false which 
            // is turned to the opposite by 
            // the Logical NOT operator (!) 
            xIsNext: !(step % 2), 
            winner: winner
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
                        onClick={(i, col, row) => {
                            return this.handleClick(i, col, row);
                        }}
                    />
                </div>
                <div className="game-info">
                    <Status
                        xIsNext={this.state.xIsNext} 
                        winner={this.state.winner}
                    ></Status>
                    <MoveHistoryList
                        history={this.state.history}
                        onClick={(step) => this.jumpTo(step)}
                    ></MoveHistoryList>
                </div>
            </div>
        );
    }
}

export default Game;