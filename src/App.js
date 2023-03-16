import React, { Component } from 'react';
import { useState } from 'react';
import orangeImg from "./img/orange.png";

// TODO:
//   - Turn ':)' into fruits!
//   - Add option to choose marker
//   - Make it purty
//   - Add alt text to villager images when generated

function Marker({marker}) {
  console.log('Marker component running')
  return (
    <img 
      className='markerImage' 
      src={marker} 
      alt='Bingo marker'
      width='125px' 
      height='125px' 
    />
  );
}

function Square({value, marker, background, onSquareClick, Marker}) {
  return (
    <div>
      {/* <button 
        className='markerImage' 
        style={{backgroundImage: `url(${orangeImg})`}}
        alt='Bingo marker'
        width='125px' 
        height='125px' 
      /> */}
      <button 
        className="square" 
        onClick={onSquareClick}
        style={{backgroundImage: `url(${background})`}}
      >
        <img src={marker} />
        {value}
      </button>
    </div>
  );
}

function Button({onButtonClick}) {
  return (
    <div>
        <button 
            className="shuffle" 
            onClick={onButtonClick}
        >
            Shuffle!
        </button>
    </div>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [board, shuffleBoard] = useState(Array(25).fill(null));
  const [marker, setMarker] = useState(``); // `appleImg`


  function markerPick(i) {
    console.log('markerPick is running...');

    const options = ['apple', 'cherry', 'coconut', 'orange', 'peach', 'pear'];
    let selection = options[i];
    const selectionUrl = `./img/${selection}.png`;

    setMarker(selectionUrl);

    console.log(`User chose ${selection}`);
    console.log(`Marker state is now ${selectionUrl}`);    
  }

  
  function handleClick(i) {
    console.log('handleClick running!')
    const nextSquares = squares.slice();
    if(!squares[i]) {
      // nextSquares[i] = (
        // <img 
          // src={marker}
          // className='markerImage' 
          // style={{backgroundImage: `url(${marker})`}}
          // alt='Bingo marker'
          // width='125px' 
          // height='125px' 
        // />
      // );
      nextSquares[i] = `:)`;
      // nextMark[i] = 'ORANGE';
    } else {
      nextSquares[i] = null;
      // nextMark[i] = null;
    }
    setSquares(nextSquares);
    // setMarker(nextMark);
  }

  function populateImages() {
    setSquares(Array(25).fill(null));
    const nextBoard = board.slice();
    let alreadyUsed = [];
    for(let i = 0; i < 25; i++) {
      let villagerNum = Math.floor(Math.random() * 391);
      while(alreadyUsed.includes(villagerNum) || villagerNum < 1) {
        villagerNum = Math.floor(Math.random() * 391);
      }
      alreadyUsed.push(villagerNum);
      const villagerUrl = `https://acnhapi.com/v1/images/villagers/${villagerNum}`;
      nextBoard[i] = villagerUrl;
    }
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
        <Square value={squares[0]} background={board[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} background={board[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} background={board[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} background={board[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} background={board[4]} onSquareClick={() => handleClick(4)} />
      </div>
      <div className="board-row">
        <Square value={squares[5]} background={board[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} background={board[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} background={board[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} background={board[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} background={board[9]} onSquareClick={() => handleClick(9)} />
      </div>
      <div className="board-row">
        <Square value={squares[10]} background={board[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} background={board[11]} onSquareClick={() => handleClick(11)} />
        {/* Free space: */}
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} background={board[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} background={board[14]} onSquareClick={() => handleClick(14)} />
      </div>
      <div className="board-row">
        <Square value={squares[15]} background={board[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} background={board[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} background={board[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} background={board[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} background={board[19]} onSquareClick={() => handleClick(19)} />
      </div>
      <div className="board-row">
        <Square value={squares[20]} background={board[20]} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} background={board[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} background={board[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} background={board[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} background={board[24]} onSquareClick={() => handleClick(24)} />
      </div>
      <div className="status">{status}</div>
      <Button className="shuffle" onButtonClick={() => populateImages()}>Shuffle</Button>
      <div className="marker-options">
        <ul>
          <button><li onClick={() => markerPick(0)}>Apple</li></button>
          <button><li onClick={() => markerPick(1)}>Cherry</li></button>
          <button><li onClick={() => markerPick(2)}>Coconut</li></button>
          <button><li onClick={() => markerPick(3)}>Orange</li></button>
          <button><li onClick={() => markerPick(4)}>Peach</li></button>
          <button><li onClick={() => markerPick(5)}>Pear</li></button>
        </ul>
      </div>
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