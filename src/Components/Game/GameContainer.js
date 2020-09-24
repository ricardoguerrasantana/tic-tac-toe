import React from 'react';
import update from 'immutability-helper';
// Helper Functions
import { calculateWinner } from '../../util/helpers';
// Pesentational Component
import { GameRendering } from './GameRendering';

let counter = 0;

class GameContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initialize();

        this.handleClickSquare = this.handleClickSquare.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.toggleOrder = this.toggleOrder.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.changePlayerName = this.changePlayerName.bind(this);
        this.applyPlayersColor = this.applyPlayersColor.bind(this);
        this.highlightMoveHistory = this.highlightMoveHistory.bind(this);
        this.styleSquares = this.styleSquares.bind(this);
    }

    initialize() {
        const col = 3;
        const row = 3;

        const qtyOfSquares = col * row;
        const history = [{
            squares: Array(qtyOfSquares).fill(null),
        }];
        
        const locations = [];
        for (let rowNum = 0; rowNum < row; rowNum++) {
            for (let colNum = 0; colNum < col; colNum ++) {
                locations.push({
                    col: colNum + 1,
                    row: rowNum + 1,
                });
            }
        }

        let players;
        if (counter++) {
            players = update(this.state.players, {});
        } else {
            players = {
                "X": {
                    name: "X", 
                    color: [0, 0, 0], 
                }, 
                "O": {
                    name: "O", 
                    color: [0, 0, 0], 
                },
            }
        }

        return {
            col: col,
            row: row,
            history: history,
            currentSquares: Array(qtyOfSquares).fill(null), 
            xIsNext: true,
            winnersResult: {
                winner: null,
                squares: []
            },
            moveNum: 0, 
            sequence: ["start"],
            locations: locations,
            toggleMoveHistoryList: false,
            players: players,
        };
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
            calculateWinner(currentSquares, this.state.players);
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
            currentSquares: currentSquares, 
            xIsNext: !this.state.xIsNext,
            winnersResult: winnersResult, 
            moveNum: this.state.moveNum + 1, 
            sequence: sequence.concat([i]),
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
            calculateWinner(currentSquares, this.state.players);
        this.setState({
            // !(moveNum % 2) this is: because X starts 
            // first (moveNum 0) it is even, then module of 
            // a even number is 0, evaluated as false which 
            // is turned to the opposite by 
            // the Logical NOT operator (!) 
            currentSquares: currentSquares,
            xIsNext: !(moveNum % 2), 
            winnersResult: winnersResult, 
            moveNum: moveNum, 
        });
    }

    toggleOrder(key) {
        this.setState({
            [key]: !this.state[key]
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
            players: Object.assign(
                {},
                this.state.players,
                { 
                    [playerMark]: Object.assign(
                        {},
                        this.state.players[playerMark],
                        {
                            name: value,
                        }
                    )
                }
            )
        });
    }

    applyPlayersColor() {
        const playerXColor = this.formatColor(this.state.players.X.color);
        const playerOColor = this.formatColor(this.state.players.O.color);

        this.styleSquares(this.state.sequence, true);

        const playerXElementsColor = document.getElementsByClassName("playerX-color");
        Object.entries(playerXElementsColor).forEach(([key, el]) => {
            el.style.color = playerXColor;
        });

        const playerOElementsColor = document.getElementsByClassName("playerO-color");
        Object.entries(playerOElementsColor).forEach(([key, el]) => {
            el.style.color = playerOColor;
        });

        const playerXElementsBacgroundColor = document.getElementsByClassName("playerX-background-color");
        Object.entries(playerXElementsBacgroundColor).forEach(([key, el]) => {
            el.style.backgroundColor = playerXColor;
        });

        const playerOElementsBacgroundColor = document.getElementsByClassName("playerO-background-color");
        Object.entries(playerOElementsBacgroundColor).forEach(([key, el]) => {
            el.style.backgroundColor = playerOColor;
        });

        const noneBackgroundColorElements = document.getElementsByClassName("none-background-color");
        Object.entries(noneBackgroundColorElements).forEach(([key, el]) => {
            el.style.backgroundColor = "none";
        });

        const whiteColorElements = document.getElementsByClassName("white-color");
        Object.entries(whiteColorElements).forEach(([key, el]) => {
            el.style.color = "white";
        });
    }

    formatColor(arr) {
        return `rgb(${arr.join(', ')})`;            
    }

    componentDidMount() {
        this.applyPlayersColor();
    }

    componentDidUpdate() {
        this.applyPlayersColor();
    }

    chooseDarkColor() {
        let color;
        do {
            color = [];
            for (let i = 0; i < 3; i++) {
                color.push(Math.floor(Math.random() * 256));
            }
        } while (this.islight(color));

        return color;
    }

    changeColor(playerMark) {
        this.setState({
            players: Object.assign(
                {},
                this.state.players,
                {
                    [playerMark]: Object.assign(
                        {},
                        this.state.players[playerMark], 
                        {
                            color: this.chooseDarkColor()
                        }
                    )
                }
            )
        });
    }

    islight(color) {
        return color.reduce((a, b) => a + b) > 127 * 3;
    }

    highlightMoveHistory(i, active) {
        if (active) {
            const sequence = this.state.sequence.slice();
            const endIndex = sequence.findIndex(el => el === i);
            const currentSequence = [];
            this.state.sequence.forEach((el, i) => {
                if (i <= endIndex) {
                    currentSequence.push(el);
                }
            });
            this.styleSquares(currentSequence.slice(0, this.state.moveNum + 1), false);
        } else {
            this.styleSquares(this.state.sequence, true);
        }
    }

    styleSquares(currentSequence, playMode) {
        const playerXColor = this.formatColor(this.state.players.X.color);
        const playerOColor = this.formatColor(this.state.players.O.color);

        this.state.currentSquares.forEach((square, i) => {
            const el = document.getElementById(`square ${i}`);
            if (this.state.winnersResult.squares.includes(i)) {
                if (square === 'X') {
                    el.style.backgroundColor = playerXColor;
                    el.style.color = "white";
                } else if (square === "O") {
                    el.style.backgroundColor = playerOColor;
                    el.style.color = "white";
                }
                if (!playMode && !currentSequence.includes(i)) {
                    el.style.backgroundColor = "dimgrey";
                    el.style.color = "silver";
                }
            } else {
                if (square === 'X') {
                    el.style.backgroundColor = "white";
                    el.style.color = playerXColor;
                } else if (square === "O") {
                    el.style.backgroundColor = "white";
                    el.style.color = playerOColor;
                } else {
                    el.style.backgroundColor = "white";
                    el.style.color = "black";
                }
                if (!playMode && !currentSequence.includes(i)) {
                    el.style.backgroundColor = "silver";
                    el.style.color = "dimgrey";    
                }
            }
        });
    }

    render() {
        return (
            <GameRendering 
                col={this.state.col} 
                row={this.state.row} 
                history={this.state.history}
                xIsNext={this.state.xIsNext} 
                winnersResult={this.state.winnersResult}
                moveNum={this.state.moveNum}
                sequence={this.state.sequence} 
                locations={this.state.locations} 
                toggleMoveHistoryList={this.state.toggleMoveHistoryList}
                players={this.state.players}
                handleClickSquare={(i) => 
                    this.handleClickSquare(i)}
                jumpTo={(moveNum) => this.jumpTo(moveNum)}
                toggleOrder={(key) => this.toggleOrder(key)}
                resetGame={() => this.resetGame()}
                changePlayerName={(e, playerMark) => 
                    this.changePlayerName(e, playerMark)}
                changeColor={(playerMark) => 
                    this.changeColor(playerMark)}
                highlightMoveHistory={(i, active) => this.highlightMoveHistory(i, active)}
            ></GameRendering>
        );
    }
}

export default GameContainer;