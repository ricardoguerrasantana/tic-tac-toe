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
    // Loops to check for a winner
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        console.log(a);
        console.log(squares[a]);
        console.log(b);
        console.log(squares[b]);
        console.log(c);
        console.log(squares[c]);
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            console.log(squares[a]);
            console.log(squares[a] === squares[b]);
            console.log(squares[b] === squares[c]);
            return squares[a];
        }
    }
    // If the loop doesn't return a winner the function is 
    // returned as null
    if (squares.every((square) => square !== null)) {
        console.log('draw');
        return false;
    } else {
        return null;
    }
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