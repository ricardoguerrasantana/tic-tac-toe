export function calculateWinner(squares, players) {
    /**
     * Array indexes for posible winner lines.
     */
    let lines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    /**
     * Correction for zero-based index array.
     */
    lines = lines.map(line => line.map(i => --i));
    /**
     * Algorithm to search for a winner
     * 1. Initialize the winner's result object to the no 
     * winner state. If there is not winner or draw yet, 
     * the function is going to return this default 
     * initialization.
     */
    let winnersResult = {
        winner: null,
        squares: [],
    };
    /**
     * 2. Check if every square got already a mark. if so, 
     * set the winner's result object to the draw state.
     */
    if (squares.every((square) => square !== null)) {
        winnersResult = {
            winner: false, 
            squares: [],
        };
    } 
    /**
     * 3. loop up for a winner. Then if it finds a winner 
     * sets the winner's result object with a winner and 
     * every square which is on a winner's line or lines.
     */
    const isNotInWinnersResultSquare = (num) => {
        return !winnersResult.squares.includes(num);
    }
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && 
            squares[a] === squares[b] && 
            squares[b] === squares[c]) {
            const highlightSquares = 
            winnersResult.squares.slice().concat(
                [a , b , c].filter(isNotInWinnersResultSquare)
            );
            winnersResult = {
                winner: players[squares[a]].name,
                squares: highlightSquares,
            };
        }
    }
    /**
     * 4. Return the winner's result object with the proper 
     * value in each case. This algorithm ensures not just to 
     * catch the first winner line found, but every 
     * simultaneous lines that could yeld the winner.
     */
    return winnersResult;
}