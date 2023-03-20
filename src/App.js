import React, { Component } from 'react';
import { useState } from 'react';
// import appleImg from "./img/apple.png";
// import cherryImg from "./img/cherry.png";
// import coconutImg from "./img/coconut.png";
import orangeImg from "./img/orange.png";
// import peachImg from "./img/peach.png";
// import pearImg from "./img/pear.png";


// TODO:
//   - Turn ':)' into fruits!
//   - Add option to choose marker
//   - Make it purty
//   - Add alt text to villager images when generated

function Marker(marker, selection) {
  console.log(`Marker component running: src = ${marker.selection}`);
  // console.log(marker.selection)
  // console.log(`backgroundImage: `url(${marker.selection})``);
  return (
    <div>
      <img 
        className='markerImage'
        // src={marker}
        // style={{backgroundImage: `url(${marker.selection})`}}
        // style={{backgroundImage: `${selection}`}}
        src={selection}
        alt='Bingo marker'
        width='125px' 
        height='125px' 
      />
    </div>
  );
}

function Square({value, marker, squares, selection, title, background, onSquareClick, Board, Marker, markerPick}) {
  //console.log(`Square component running: src = ${selection}`);
  // marker variable isn't reaching this component for some reason
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
        alt={title}
      >
        <img 
          className="activeMarkers"
          src={orangeImg} 
          alt=":)" 
          style={{
            zIndex: 10,
            float: 'left',
            display: value === true ? 'block' : 'none',
            position: 'absolute'
          }}
          width='125px'
          height='125px'
        />
        {Marker}
        <h1 
          className="villagerName"
        >
          {title}
        </h1>
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
  const [name, setName] = useState(Array(25).fill(null));
  const [marker, setMarker] = useState({orangeImg}); // `appleImg`

  //console.log(`${marker.orangeImg} is the same as ${orangeImg}`);

  function markerPick(i) {
    console.log('markerPick is running...');

    const options = ['appleImg', 'cherryImg', 'coconutImg', 'orangeImg', 'peachImg', 'pearImg'];
    let selection = options[i];
    //ket selectionUrl = `./img/${selection}.png`;

    setMarker(selection);

    // console.log(`User chose ${selection}`);
    console.log(`Marker state is now ${selection}`);
  }

  
  function handleClick(i) {
    console.log(`Square ${i} clicked!`)
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
      nextSquares[i] = true;
      // nextMark[i] = (
      //   <img src={marker} />
      // );
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
    populateNames(alreadyUsed);
    alreadyUsed = [];
  }

  async function populateNames(arr) {
    const nextNames = name.slice();
    for(let i = 0; i < arr.length; i++) {
      let newName = await villagerName(arr[i]);
      nextNames[i] = newName;
    }
    setName(nextNames);
  }

  async function villagerName(villagerID) {
    const response = await fetch(`http://acnhapi.com/v1/villagers/${villagerID}`);
    let data = await response.json();
    const currentVillager = data.name["name-USen"];
    return currentVillager;
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Bingo!"
  }

  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} title={name[0]} background={board[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} title={name[1]} background={board[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} title={name[2]} background={board[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} title={name[3]} background={board[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} title={name[4]} background={board[4]} onSquareClick={() => handleClick(4)} />
      </div>
      <div className="board-row">
        <Square value={squares[5]} title={name[5]} background={board[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} title={name[6]} background={board[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} title={name[7]} background={board[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} title={name[8]} background={board[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} title={name[9]} background={board[9]} onSquareClick={() => handleClick(9)} />
      </div>
      <div className="board-row">
        <Square value={squares[10]} title={name[10]} background={board[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} title={name[11]} background={board[11]} onSquareClick={() => handleClick(11)} />
        {/* Free space: */}
        <Square value={squares[12]} title="FREE" onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} title={name[13]} background={board[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} title={name[14]} background={board[14]} onSquareClick={() => handleClick(14)} />
      </div>
      <div className="board-row">
        <Square value={squares[15]} title={name[15]} background={board[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} title={name[16]} background={board[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} title={name[17]} background={board[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} title={name[18]} background={board[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} title={name[19]} background={board[19]} onSquareClick={() => handleClick(19)} />
      </div>
      <div className="board-row">
        <Square value={squares[20]} title={name[20]} background={board[20]} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} title={name[21]} background={board[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} title={name[22]} background={board[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} title={name[23]} background={board[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} title={name[24]} background={board[24]} onSquareClick={() => handleClick(24)} />
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
      {/* <img src={marker} alt="game marker" /> */}
      {/* <img src={orangeImg} alt="game marker" /> */}
      <Marker selection={marker} />
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

