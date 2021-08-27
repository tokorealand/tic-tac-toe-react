import React from 'react';
import Board from '../Board/board';

const Game = () => {
    const winningText = ' has won the game!';
    const [history, setHistory] = React.useState([{ squares: Array(9).fill('') }]);
    const [stepNumber, setStepNumber] = React.useState(0);
    const [xIsNext, setXIsNext] = React.useState(true);
    const [status, setStatus] = React.useState('');

    function calculateWinner(squares: string[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const handleClick = (i: number) => {
        const hist = history.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(hist.concat([{ squares }]));
        setStepNumber(hist.length);
        setXIsNext(!xIsNext);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={history[stepNumber].squares} onClick={i => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default Game;
