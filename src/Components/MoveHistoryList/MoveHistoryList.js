import React from 'react';

class MoveHistoryList extends React.Component {
    boldCurrentMove(moveNum) {
        if (this.props.moveNum === moveNum) {
            return "bold";
        } else {
            return "normal";
        }
    }
    
    render() {
        const moves = this.props.history.map((move, moveNum) => {
            // Get last marked position (i)
            const sequence = this.props.sequence.slice();
            const i = sequence[moveNum];
            const text = (!moveNum ? <span>Game Start</span> : 
                <span>move #{moveNum} - <b>{move.squares[i]}</b> (
                {this.props.locations[i].col} , 
                {this.props.locations[i].row})</span>);
            return (
                <li key={moveNum}
                    className={this.boldCurrentMove(moveNum)}
                >
                    <button 
                        className={this.boldCurrentMove(moveNum)}
                        /**
                        Action to take back the game to the 
                        specified move 
                        */
                        onClick={() => this.props.jumpTo(moveNum)}
                    >
                    {text}
                    </button>
                </li>
            );
        });

        moves.sort((firstEl, secondEl) => {
            if  (this.props.toggleMoveHistoryList) {
                return secondEl.key - firstEl.key;
            } else {
                return firstEl.key - secondEl.key;
            }
        });

        return (
            <div>
                { moves.length > 1 ? (
                <button
                    className="toggle" 
                    onClick={() => this.props.toggleOrder()}
                >
                    Toggle the List Order
                </button>
                ) : "" }
                <p>Move number - Player - <br />
                Location (column, Row)</p>
                <ol reversed={this.props.toggleMoveHistoryList}>
                {moves}
                </ol>
                <p>Press to go back to any <br /> 
                move and continue playing</p>
            </div>
        );
    }
}

export default MoveHistoryList;