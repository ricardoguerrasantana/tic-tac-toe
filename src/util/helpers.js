export function calculateWinner(squares) {
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
        [3, 5, 7]
    ];
    // This is a correction for make the keyboard to coincide
    // with an zero-based index array
    lines = lines.map(line => {
        return line.map(i => --i);
    });
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && 
            squares[a] === squares[b] && 
            squares[b] === squares[c]) {
            const isNotInclued = (num) => {
                return !winnersResult.squares.includes(num);
            }
            const highlightSquares = 
            winnersResult.squares.slice().concat(
                [a , b , c].filter(isNotInclued)
            );
            winnersResult = {
                winner: squares[a],
                squares: highlightSquares,
            };
        }
    }
    /**
     * 4. Return the winner's result object with the proper
     * value in each case.
     */
    return winnersResult;
}

export function styleWinnerLine(squares, styles, defaultStyle, highlightStyle) {
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
        return line.map(num => --num);
    });
    // Loops to check for a winner
    const newStyles = styles;
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            [a, b, c].forEach((el) => {
                return newStyles[el] = highlightStyle;
            });
            return newStyles;
        }
    }
    // If the previous loop doesn't return a winner the 
    // function a default array styles
    for (let i = 0; i < newStyles.length; i++) {
        newStyles[i] = defaultStyle;
    }
    return newStyles;
}