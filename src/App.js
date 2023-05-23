// import React, { Component } from 'react';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfettiExplosion from 'react-confetti-explosion';
import giftImg from "./img/Gift.png"
import markerSprite from "./img/sprite.png"

function Square({onSquareClick, background, title, selection, value}) {  
  return (
    <div>
      <button 
        className="square"
        onClick={onSquareClick}
        style={{
          backgroundImage: `url(${background})`,
        }}
        alt={title}
      >
        <h1 className="villagerName clearfix">{title}</h1>
        <div 
          className="opacityChanger"
          style={{
            position: `absolute`,
            top: `0px`,
            right: `0px`,
            bottom: `0px`,
            left: `0px`,
            backgroundColor: value === true ? `rgba(0,0,0, 0.60)`: `rgba(255, 255, 255, 0)`,
          }}
        />
        <img 
          className="activeMarkers"
          src={markerSprite}
          alt="BINGO marker" 
          style={{
            display: value === true ? 'block' : 'none',
            objectPosition: `${selection.position}`,
            top: `${selection.top}`,
            bottom: `${selection.bottom}`,
            right: `${selection.right}`,
            left: `${selection.left}`,
            width: `${selection.width}`,
            height: `${selection.height}`,
            transform: `${selection.transform}`,
          }}
        />
      </button>
    </div>
  );
}

function ShuffleButton({onButtonClick}) {
  return (
    <div class="d-grid gap-2 col-6 mx-auto">
      <button 
          className="shuffle btn btn-primary" 
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
  const [marker, setMarker] = useState({name: 'apple', position: '-1679px -966px', top: '110px', bottom: '0px', right: '4px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'});
  const [isExploding, setIsExploding] = useState(false);

  const sprite = [
    {name: 'apple', position: '-1679px -966px', top: '110px', bottom: '0px', right: '4px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'cherry', position: '-1907px -2036px', top: '110px', bottom: '0px', right: '0px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'coconut', position: '-1029px -2588px', top: '115px', bottom: '0px', right: '0px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'orange', position: '-1023px -3082px', top: '117px', bottom: '0px', right: '0px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'peach', position: '-2138px -1535px', top: '117px', bottom: '0px', right: '0px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'pear', position: '-1002px -2108px', top: '117px', bottom: '0px', right: '0px', left: '5px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'bells', position: '-2115px -2492px', top: '110px', bottom: '0px', right: '0px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'fossil', position: '-2117px -408px', top: '115px', bottom: '0px', right: '0px', left: '0px', width: '310px', height: '350px', transform: 'scale(0.30)'},
    {name: 'gift', position: '-648px -1280px', top: '255px', bottom: '0px', right: '0px', left: '12px', width: '450px', height: '636px', transform: 'scale(0.20)'}
  ];

  function markerPick(i) {
    console.log('markerPick is running...');
    let selection = sprite[i];
    setMarker(selection);
    console.log(`marker state is now ${selection}`);
  }

  function handleClick(i) {
    console.log(`Square ${i} clicked!`)
    const nextSquares = squares.slice();
    if(!squares[i]) {
      nextSquares[i] = true;
    } else {
      nextSquares[i] = null;
    }
    setSquares(nextSquares);
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
    const response = await fetch(`https://acnhapi.com/v1/villagers/${villagerID}`);
    let data = await response.json();
    const currentVillager = data.name["name-USen"];
    return currentVillager;
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "BINGO!"
    // setIsExploding(true);
  }

  return (
    <div className="entireBoard">
      <div className="boardContainer">
        <div className="board-row">
          <h1 className="titleSquare">B</h1>
          <Square value={squares[0]} title={name[0]} background={board[0]} selection={marker} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} title={name[1]} background={board[1]} selection={marker} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} title={name[2]} background={board[2]} selection={marker} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} title={name[3]} background={board[3]} selection={marker} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} title={name[4]} background={board[4]} selection={marker} onSquareClick={() => handleClick(4)} />
        </div>
        <div className="board-row">
          <h1 className="titleSquare">I</h1>
          <Square value={squares[5]} title={name[5]} background={board[5]} selection={marker} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} title={name[6]} background={board[6]} selection={marker} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} title={name[7]} background={board[7]} selection={marker} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} title={name[8]} background={board[8]} selection={marker} onSquareClick={() => handleClick(8)} />
          <Square value={squares[9]} title={name[9]} background={board[9]} selection={marker} onSquareClick={() => handleClick(9)} />
        </div>
        <div className="board-row">
          <h1 className="titleSquare">N</h1>
          <Square value={squares[10]} title={name[10]} background={board[10]} selection={marker} onSquareClick={() => handleClick(10)} />
          <Square value={squares[11]} title={name[11]} background={board[11]} selection={marker} onSquareClick={() => handleClick(11)} />
          {/* Free space: */}
          <Square value={squares[12]} title="FREE" background={giftImg} selection={marker} onSquareClick={() => handleClick(12)} />
          <Square value={squares[13]} title={name[13]} background={board[13]} selection={marker} onSquareClick={() => handleClick(13)} />
          <Square value={squares[14]} title={name[14]} background={board[14]} selection={marker} onSquareClick={() => handleClick(14)} />
        </div>
        <div className="board-row">
          <h1 className="titleSquare">G</h1>
          <Square value={squares[15]} title={name[15]} background={board[15]} selection={marker} onSquareClick={() => handleClick(15)} />
          <Square value={squares[16]} title={name[16]} background={board[16]} selection={marker} onSquareClick={() => handleClick(16)} />
          <Square value={squares[17]} title={name[17]} background={board[17]} selection={marker} onSquareClick={() => handleClick(17)} />
          <Square value={squares[18]} title={name[18]} background={board[18]} selection={marker} onSquareClick={() => handleClick(18)} />
          <Square value={squares[19]} title={name[19]} background={board[19]} selection={marker} onSquareClick={() => handleClick(19)} />
        </div>
        <div className="board-row">
          <h1 className="titleSquare">O</h1>
          <Square value={squares[20]} title={name[20]} background={board[20]} selection={marker} onSquareClick={() => handleClick(20)} />
          <Square value={squares[21]} title={name[21]} background={board[21]} selection={marker} onSquareClick={() => handleClick(21)} />
          <Square value={squares[22]} title={name[22]} background={board[22]} selection={marker} onSquareClick={() => handleClick(22)} />
          <Square value={squares[23]} title={name[23]} background={board[23]} selection={marker} onSquareClick={() => handleClick(23)} />
          <Square value={squares[24]} title={name[24]} background={board[24]} selection={marker} onSquareClick={() => handleClick(24)} />
        </div>
      </div>
      {/* <div>{isExploding && <ConfettiExplosion />}</div> */}
      <div className="status">{status}</div>
      <ShuffleButton className="shuffle" onButtonClick={() => populateImages()}>Shuffle</ShuffleButton>
      



      <div className="buttonContainerContainer mx-auto col-7">
          <button onClick={() => markerPick(0)} className="buttonContainer btn btn-outline-primary btn-default">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Apple BINGO marker" 
              style={{
                top: `38px`,
                left: `-262px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} 
            Apple
          </button>
          <button onClick={() => markerPick(1)} className="buttonContainer btn btn-outline-primary btn-default">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Cherry BINGO marker" 
              style={{
                top: `-229px`,
                left: `-318px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} 
            Cherry
          </button>
          <button onClick={() => markerPick(2)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Coconut BINGO marker" 
              style={{
                top: `-355px`,
                left: `13px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} Coconut
          </button>
          <button onClick={() => markerPick(3)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Orange BINGO marker" 
              style={{
                top: `-460px`,
                left: `150px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} Orange
          </button>
          <button onClick={() => markerPick(4)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Orange BINGO marker" 
              style={{
                top: `-92px`,
                left: `-262px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} Peach
          </button>
          <button onClick={() => markerPick(5)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Coconut BINGO marker" 
              style={{
                top: `-233px`,
                left: `18px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} Pear
          </button>
          <button onClick={() => markerPick(6)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Orange BINGO marker" 
              style={{
                top: `-343px`,
                left: `-367px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} Bells
          </button>
          <button onClick={() => markerPick(7)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Apple BINGO marker" 
              style={{
                top: `187px`,
                left: `-262px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(2.00)`,
              }}
            /></div>} Fossil
          </button>
          <button onClick={() => markerPick(8)} className="buttonContainer btn btn-outline-primary">
            {<div className="crop">
              <img 
              className="buttonMarker"
              src={markerSprite}
              alt="Orange BINGO marker" 
              style={{
                top: `-92px`,
                left: `-52px`,
                width: `310px`,
                height: `320px`,
                objectFit: `cover`,
                position: `absolute`,
                transform: `scale(1.10)`,
              }}
            /></div>} Gift
          </button>
      </div>
    </div>

      /* <div className="marker-options">
        <ul>
          <button><li onClick={() => markerPick(0)}><div 
          src={markerSprite} 
          style={{
            objectPosition: `${sprite[0].position}`,
            top: `${sprite[0].top}`,
            bottom: `${sprite[0].bottom}`,
            right: `${sprite[0].right}`,
            left: `${sprite[0].left}`,
            width: `${sprite[0].width}`,
            height: `${sprite[0].height}`,
            transform: `${sprite[0].transform}`,
          }}/>{sprite[0].name}</li></button>
          <button onClick={() => markerPick(1)} class="cherryContainer">
            <img src={markerSprite} className="cherry" border="0" />
          </button>
          <button><li onClick={() => markerPick(2)}>Coconut</li></button>
          <button><li onClick={() => markerPick(3)}>Orange</li></button>
          <button><li onClick={() => markerPick(4)}>Peach</li></button>
          <button><li onClick={() => markerPick(5)}>Pear</li></button>
          <button><li onClick={() => markerPick(6)}>Bells</li></button>
          <button><li onClick={() => markerPick(7)}>Fossil</li></button>
          <button><li onClick={() => markerPick(8)}>Gift</li></button>
        </ul>
      </div>
    </div> */
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

