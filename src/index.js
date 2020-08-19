import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Status(props) {
    let status;
    if (props.winner) {
        status = `Winner: ${props.winner}`;
    } else {
        status = `Next player: 
        ${props.xIsNext ? 'X' : 'O'}`;
    }
    return (<div className="status">{status}</div>);
}

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            xIsNext: true,
            winner: null
        });

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        // Make an immutable copy of the last set of games's moves
        const history = this.state.history;
        const squares = history[history.length - 1].squares.slice();
        // Disable the move if there is a winner 
        // or if the square's been marked
        if (this.state.winner || squares[i]) {
            return;
        }
        //Assign the porper value for the clicked square
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        //Determine if there is a winner due the last move 
        const winner = calculateWinner(squares);
        this.setState({
            // Add the last set of game's moves to the array 
            // which track game's moves (unlike push() method, 
            // concat() method doesn't muatate the 
            // original array)
            history: history.concat(
                [
                    {
                        squares: squares
                    }
                ]
            ),
            xIsNext: !this.state.xIsNext,
            winner: winner
        });
    }

    render() {
        const history = this.state.history;
        const squares = history[history.length - 1].squares.slice();
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={squares} 
                        xIsNext={this.state.xIsNext} 
                        winner={this.state.winner} 
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <Status
                        xIsNext={this.state.xIsNext} 
                        winner={this.state.winner}
                    ></Status>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    // Array indexes for posible goals
    // This is how you see the board game on the keyboard
    let lines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];
    // This is a correction for make the keyboard to coincide
    // with an zero-based index array
    lines = lines.map(line => {
        return line.map(number => --number);
    });
    // Loops to check for a winner
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            const winner = squares[a];
            return winner;
        }
    }
    // If the loop doesn't return a winner the function is 
    // returned as null
    return null;
}