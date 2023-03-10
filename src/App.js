import React, { Component } from 'react';
import { useState } from 'react';
import orangeImg from "./img/orange.png";

// TODO:
// Add villager images to squares
//     + Random
//     + Check for no repeats
//     + Shuffle button?
// Replace square 'X' markers with icon marker


function Square({value, onSquareClick, onShuffleClick, onClick, shuffleBoard}) {
  return (
    <div>
      <button 
        className="square" 
        onClick={onSquareClick} 
        //style={{ backgroundImage: `url("https://acnhapi.com/v1/images/villagers/"${onShuffleClick()}")` }}
        // START HERE**************************
        style={onClick}
      >
        {value}
      </button>
    </div>
  );
}


// Populate bingo card with villager images
// let alreadyUsed = [];
// function villagerPopulate() {
//   console.log('function running!');
//   let villagerNum = Math.floor(Math.random() * 391);
//   while(alreadyUsed.includes(villagerNum)) {
//     villagerNum = Math.floor(Math.random() * 391);
//   }
//   console.log(`villager number = ${villagerNum}`);
//   alreadyUsed.push(villagerNum);
//   const villagerUrl = `https://acnhapi.com/v1/images/villagers/${villagerNum}`; 
//   let villagerStr = `backgroundImage: "url("${villagerUrl}")"`;
//   return villagerStr;
// }


export default function Board() {
  // A piece of state in the Board component: establishes state for toggle clicking
  // Board declares a state variable named squares that defaults to an array of 25 nulls corresponding to the 25 squares
  const [squares, setSquares] = useState(Array(25).fill(null));
  // Establishes state for background img
  const [board, shuffleBoard] = useState(Array(25).fill(null));

  function handleClick(i) {
    // // Create a copy of the squares array and stores in the variable 'nextSquares'
    const nextSquares = squares.slice();
    if(!squares[i]) {
      // nextSquares[i] = (
      //   <div>
      //     <img className='markerImage' src={orangeImg} key={i} alt="Bingo marker" width='125px' height='125px' />
      //   </div>
      //   );
      nextSquares[i] = ":)";
    } else {
      nextSquares[i] = null;
    }

    // Let React know that the state of the component has changed, triggers a re-render of the components that use the squares state (Board) as well as child components (Square components that make up the board)
    setSquares(nextSquares);
  }

  // let alreadyUsed = [];
  function populateImages() {
    console.log('Im running')
    // create copy of the board array, store in nextBoard
    let nextBoard = board.slice();
    for(let i = 0; i < 25; i++) {
      let villagerNum = Math.floor(Math.random() * 391);
      // Add alreadyUsd check later
      let villagerUrl = `https://acnhapi.com/v1/images/villagers/${villagerNum}`;
      //let styleString = 'backgroundImage: url("https://acnhapi.com/v1/images/villagers/' + villagerNum + '")';
      let styleString = `backgroundImage: url("${villagerUrl}")`;

      nextBoard[i] = styleString;
      // return styleString;
    }
    console.log(nextBoard);

    shuffleBoard(nextBoard);
  }
  
  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Bingo!"
  }

  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} style={ board } onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} style={ board } onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} style={ board } onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} style={ board } onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} style={ board } onSquareClick={() => handleClick(4)} />
      </div>
      <div className="board-row">
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
      </div>
      <div className="board-row">
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
      </div>
      <div className="board-row">
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
      </div>
      <div className="board-row">
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
      </div>
      <div className="status">{status}</div>
      <button className="shuffle" value={board} onClick={() => populateImages()}>Shuffle</button>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3, 4],          // horizontal row 1
    [5, 6, 7, 8, 9],          // horizontal row 2
    [10, 11, 12, 13, 14],     // horizontal row 3
    [15, 16, 17, 18, 19],     // horizontal row 4
    [20, 21, 22, 23, 24],     // horizontal row 5
    [0, 6, 12, 18, 24],       // L to R diagonal
    [4, 8, 12, 16, 20],       // R to L diagonal
    [0, 5, 10, 15, 20],       // vertical row 1
    [1, 6, 11, 16, 21],       // vertical row 2
    [2, 7, 12, 17, 22],       // vertical row 3
    [3, 8, 13, 18, 23],       // vertical row 4
    [4, 9, 14, 19, 24]        // vertical row 5
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
}