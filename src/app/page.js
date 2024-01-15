"use client";
import { useState, useEffect } from "react";


function Square({value, onClick}) {
  return <button className="square" onClick={onClick}>
    {value}
  </button>
}




function Board({squares, xIsNext, onPlay}) {
  
  //const [squares, setSquares] = useState(Array(9).fill(null)); //Array(9).fill(null)
  //const [xIsNext2, setXIsNext2] = useState(true);

  const newSquares = squares.slice();
  const nullCount = newSquares.filter(value => value === null).length

  function onSquareClick(idx) {
    if (squares[idx] || calculateWinner(squares)) return;
    //const newSquares = squares.slice();
    newSquares[idx] = xIsNext ? "X" : "O";
    onPlay(newSquares);

    //setXIsNext2(!xIsNext2);
    //setSquares(newSquares);
  };

  const winner = calculateWinner(squares);


  return (
    <>
      {winner ? <p>Winner is {winner}</p> : <p>{nullCount ? "" : "It's a tie!"}</p>}
      <div>
      {!nullCount ? "" : <div>{winner ? "" : <p>Next Player: {xIsNext ? "X" : "O"}</p>}</div>}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onClick={() => onSquareClick(5)} />
      </div>      
      <div className="board-row">
        <Square value={squares[6]} onClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onClick={() => onSquareClick(8)} />
      </div>
      {winner ? <p>GAME OVER</p> : <p>{nullCount ? "" : "GAME OVER!"}</p>}

    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares [b] && squares[b] === squares [c]) {
      return squares[a];
    }
};

  return null;
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move # " + move;
    } else {
      description = "Go to game start"
    }

    return (
      <li key={move + Math.random()}>
        <button onClick= {() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <h1>Testing auto deployment</h1>
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}







/*
 MY SOLUTION FOR THE GAME

const newSquares = squares.slice();
const nullCount = newSquares.filter(value => value === null).length

  if (nullCount % 2 === 0 && newSquares[idx] === null) { //
    newSquares[idx] = "O";
    setSquares(newSquares);
  } else if (nullCount % 2 !== 0 && newSquares[idx] === null) {
      newSquares[idx] = "X";
      setSquares(newSquares);
  } else if (nullCount !== 0 && newSquares[idx] !== null) {
      alert("You can't override another symbol")
  }

  useEffect(() => {
    if (nullCount === 0) {
      setTimeout(() => {
        alert("GAME OVER");
        // Additional code you want to run when nullCount is 0
      }, 100);
    }
  }, [nullCount]);

  */