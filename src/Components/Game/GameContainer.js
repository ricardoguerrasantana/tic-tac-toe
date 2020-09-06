import React from 'react';
// Helper Functions
import { calculateWinner } from '../../util/helpers';
// Pesentational Component
import { GameRendering } from './GameRendering';

class GameContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initialize();

        this.handleClickSquare = this.handleClickSquare.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.toggleOrder = this.toggleOrder.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.changePlayerName = this.changePlayerName.bind(this);
    }

    initialize() {
        return {
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            xIsNext: true,
            winnersResult: {
                winner: null,
                squares: []
            },
            moveNum: 0, 
            sequence: ["start"],
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
            moveStyle: ["bold"], 
            player: {
                "X": "X", 
                "O": "O",
            },
        }
    };

    handleClickSquare(i) {
        // Make an immutable copy of the last set of games's moves
        const history = 
        this.state.history.slice(0 , this.state.moveNum + 1);
        const currentSquares = 
        history[history.length - 1].squares.slice();
        // Disable the move if there is a winner 
        // or if the square's been marked
        if (this.state.winnersResult.winner || currentSquares[i]) {
            return;
        }
        //Assign the porper value for the clicked square
        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';
        // Make an immutable copy of the sequence of 
        // the marked positions
        const sequence = 
        this.state.sequence.slice(0 , this.state.moveNum + 1);
        //Determine if there is a winner due the last move 
        const winnersResult = 
            calculateWinner(currentSquares, this.state.player);
        const moveStyle = 
        this.state.moveStyle.slice(0 , this.state.moveNum + 1).map(() => "normal");
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
            winnersResult: winnersResult, 
            moveNum: this.state.moveNum + 1, 
            sequence: sequence.concat([i]),
            moveStyle: moveStyle.concat(["bold"]),
        });
    }
    /**
     * Show the move of the indicated moveNum
     */
    jumpTo(moveNum) {
        /**
         * History of the indicated moveNum
         */
        const history = 
        this.state.history.slice(0, moveNum + 1);
        /**
         * Squares' state of the picked moveNum
         */
        const currentSquares = 
        history[history.length - 1].squares.slice();
        const winnersResult = 
            calculateWinner(currentSquares, this.state.player);
        const moveStyle = 
        this.state.moveStyle.slice().map((style, index) => {
            if (index === moveNum) {
                return "bold";
            }
            return "normal";
        });

        this.setState({
            // !(moveNum % 2) this is: because X starts 
            // first (moveNum 0) it is even, then module of 
            // a even number is 0, evaluated as false which 
            // is turned to the opposite by 
            // the Logical NOT operator (!) 
            xIsNext: !(moveNum % 2), 
            winnersResult: winnersResult, 
            moveNum: moveNum, 
            moveStyle: moveStyle,
        });
    }

    toggleOrder() {
        this.setState({
            ascendingOrder: this.state.ascendingOrder ? 
            false : true
        });
    }

    resetGame() {
        this.setState(this.initialize());
    }

    changePlayerName(e, playerMark) {
        let { target: {value} } = e;
        if (!value) {
            value = playerMark;
        }
        this.setState({
            player: Object.assign(
                {},
                this.state.player,
                { [playerMark]: value }
            )
        });
    }

    render() {
        return (
            <GameRendering 
                history={this.state.history}
                xIsNext={this.state.xIsNext} 
                winnersResult={this.state.winnersResult}
                moveNum={this.state.moveNum}
                sequence={this.state.sequence} 
                locations={this.state.locations} 
                ascendingOrder={this.state.ascendingOrder}
                moveStyle={this.state.moveStyle}
                player={this.state.player}
                handleClickSquare={(i) => 
                    this.handleClickSquare(i)}
                jumpTo={(moveNum) => this.jumpTo(moveNum)}
                toggleOrder={() => this.toggleOrder()}
                resetGame={() => this.resetGame()}
                changePlayerName={(e, playerMark) => 
                    this.changePlayerName(e, playerMark)}
            ></GameRendering>
        );
    }
}

export default GameContainer;