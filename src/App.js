import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfettiExplosion from 'react-confetti-explosion';
import giftImg from "./img/Gift.png"
import fossilImg from "./img/Fossil.png"
import markerSprite from "./img/sprite-2.png"
import './fonts/FinkHeavy.ttf';

function Header() {
  return (
    <header id="header">
        <div id="headerLeft">
          <img 
            className={`headerLeftImage`}
            src={fossilImg}
            alt="Animal Crossing fossil" 
            style={{
              // position: `absolute`,
              zIndex: 100,
              objectFit: `cover`,
              // objectPosition: `-20px -460px`,
              // objectPosition: `0px -135px`,
              width: `17%`,
              height: `17%`,
              maxWidth: `500px`,
              maxHeight: `500px`,
            }}
          />
          <h1 className={`headerTitle`}>BINGO hopper</h1>
        </div>
        <div className={`headerRight`}>
          <span className={`xs`}>An Animal Crossing: New Horizons BINGO App</span>
        </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <a href="https://rachelfairchild.netlify.app/">
        <span>&copy;</span>2023 Rachel Fairchild
      </a>
      <div className="mystery-container">
        <a href="#" id="secret"></a>
      </div>
  </footer>
  );
}

function Square({ villager, name, catchphrase, onSquareClick, selection, value }) { 

  return (
    <div>
      <button 
        className="square"
        onClick={onSquareClick}
        style={{
          backgroundImage: `url(${villager})`,
        }}
        title={catchphrase}
        alt={name}
      >
        <div 
          className="opacityChanger"
          style={{
            backgroundColor: value === true ? `rgba(0,0,0, 0.60)`: `rgba(255, 255, 255, 0)`,
          }}
        />
        <h1 className="villagerName clearfix">{name}</h1>
        <img 
          className="activeMarkers"
          src={markerSprite}
          alt="BINGO marker" 
          style={{
            display: value === true ? 'block' : 'none',
            objectPosition: `${selection.position}`,
            width: `${selection.width}`,
            height: `${selection.height}`,
            top: `${selection.top}`,
            bottom: `${selection.bottom}`,
            right: `${selection.right}`,
            left: `${selection.left}`,
            transform: `${selection.transform}`,
          }}
        />
      </button>
    </div>
  );
}

function ShuffleButton({onButtonClick}) {
  return (
    <div className="d-grid gap-2 col-6 mx-auto">
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
  const [phrase, setPhrase] = useState(Array(25).fill(null));
  const [marker, setMarker] = useState({name: 'fossil', position: '-10px -7051px', width: '2048px', height: '2048px', top: '965px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.07)'});
  const [isActive, setActive] = useState(false);

  const sprite = [
    {name: 'apple', position: '-10px -10px', width: '527px', height: '576px', top: '230px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.3)'},
    {name: 'cherry', position: '-10px -2610px', width: '519px', height: '691px', top: '290px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.25)'},
    {name: 'coconut', position: '-10px -1256px', width: '501px', height: '642px', top: '266px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.25)'},
    {name: 'orange', position: '-10px -606px', width: '534px', height: '630px', top: '264px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.22)'},
    {name: 'peach', position: '-10px -4082px', width: '786px', height: '881px', top: '380px', bottom: '0px', right: '4px', left: '-5px', transform: 'scale(0.19)'},
    {name: 'pear', position: '-10px -3321px', width: '562px', height: '741px', top: '315px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.21)'},
    {name: 'bells', position: '-10px -1918px', width: '628px', height: '672px', top: '275px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.2)'},
    {name: 'fossil', position: '-10px -7051px', width: '2048px', height: '2048px', top: '965px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.07)'},
    {name: 'gift', position: '-10px -4983px', width: '2048px', height: '2048px', top: '963px', bottom: '0px', right: '4px', left: '0px', transform: 'scale(0.065)'}
  ];

  // On load, check local storage for prev session
  // window.onload = () => {
  //   if(localStorage.getItem('ids') && localStorage.getItem('all')) { 
  //     // retrieve session IDs and parse back into array type
  //     const sessionIds = JSON.parse(localStorage.getItem('ids'));
  //     const sessionAll = JSON.parse(localStorage.getItem('all'));
  //     console.log(sessionIds);
  //     createVillagerObjects(sessionIds, sessionAll);
  //   } else {
  //     fetchVillagerInfo();
  //   }
  // };
  window.onload = () => fetchVillagerInfo();

  function markerPick(i) {
    let selection = sprite[i];
    setMarker(selection);
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if(!squares[i]) {
      nextSquares[i] = true;
    } else {
      nextSquares[i] = null;
    }
    setSquares(nextSquares);
    winnerCheck(nextSquares);
  }

  function winnerCheck(squares) {
    const winner = calculateWinner(squares);
    console.log(`${winner ? "Winner!" : "No winner yet..."}`);
    if(winner) {
      setActive(true);
    } else if(!winner) {
      setActive(false);
    }
  }

  function shuffleClick() {
    localStorage.clear('ids');
    fetchVillagerInfo();
  }

  async function fetchVillagerInfo() {
    const sessionIds = JSON.parse(localStorage.getItem('ids'));
    let sessionAll = JSON.parse(localStorage.getItem('all'));

    if(sessionAll) { 
      if(sessionIds) {
        console.log(sessionIds);
        createVillagerObjects(sessionIds, sessionAll);
      } else {
        populatedIds(sessionAll);
      }
    } else {
      const response = await fetch('https://api.nookipedia.com/villagers?game=NH&nhdetails=true', {
        method: "GET",  
        headers: {
            'X-API-KEY': process.env.REACT_APP_NOOKIPEDIA_API_KEY,
            'Accept-Version': '1.0.0',
            'Accept': 'application/json'
          }
        });
      const jsonResponse = await response.json();
      response.ok;
      response.status;
      sessionAll = jsonResponse;
      localStorage.setItem('all', JSON.stringify(sessionAll));
      
      if(sessionIds) {
        createVillagerObjects(sessionIds, sessionAll);;
      } else {
        populatedIds(sessionAll);
      }
    }

    // Generate 25 random villager IDs
    function populatedIds(all) {
      let ids = [];
      for(let i = 0; i < 25; i++) {
        let villagerNum = Math.floor(Math.random() * 419);
        while(ids.includes(villagerNum) || villagerNum < 1) {
          villagerNum = Math.floor(Math.random() * 419);
        }
        ids.push(villagerNum);
      }
      createVillagerObjects(ids, all);
      localStorage.setItem('ids', JSON.stringify(ids));
    }

    // Using villager IDs, create 25 villager objects and update states
    function createVillagerObjects(ids, all) {
      const chosenVillagers = board.slice();
      const chosenVillagersNames = name.slice();
      const chosenVillagersCatchphrase = phrase.slice();

      ids.forEach((id, i) => {

        const currentVillager = all[id];
        const currentVillagerDetails = {
          "_id": id,
          "name": currentVillager.name,
          "imageUrl": currentVillager.nh_details.photo_url,
          "catchphrase": currentVillager.nh_details.catchphrase,
        }
        chosenVillagers[i] = currentVillagerDetails['imageUrl'];
        chosenVillagersNames[i] = currentVillagerDetails['name'];
        chosenVillagersCatchphrase[i] = currentVillagerDetails['catchphrase'];
      });
      shuffleBoard(chosenVillagers);
      setName(chosenVillagersNames);
      setPhrase(chosenVillagersCatchphrase);
    }
  }

  return (
    <div className="all">
      <Header />
      <div className="entireBoard">
        <div className="boardContainer">
          <div className="confetti-container">{isActive && <ConfettiExplosion />}</div>
          <div className="board-row">
            <h1 className={`titleSquare b ${isActive ? "bounce" : ""}`}>B</h1>
            <Square value={squares[0]} name={name[0]} villager={board[0]} catchphrase={`"${phrase[0]}"`} selection={marker} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} name={name[1]} villager={board[1]} catchphrase={`"${phrase[1]}"`} selection={marker} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} name={name[2]} villager={board[2]} catchphrase={`"${phrase[2]}"`} selection={marker} onSquareClick={() => handleClick(2)} />
            <Square value={squares[3]} name={name[3]} villager={board[3]} catchphrase={`"${phrase[3]}"`} selection={marker} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} name={name[4]} villager={board[4]} catchphrase={`"${phrase[4]}"`} selection={marker} onSquareClick={() => handleClick(4)} />
          </div>
          <div className="board-row">
            <h1 className={`titleSquare i ${isActive ? "bounce" : ""}`}>I</h1>
            <Square value={squares[5]} name={name[5]} villager={board[5]} catchphrase={`"${phrase[5]}"`} selection={marker} onSquareClick={() => handleClick(5)} />
            <Square value={squares[6]} name={name[6]} villager={board[6]} catchphrase={`"${phrase[6]}"`} selection={marker} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} name={name[7]} villager={board[7]} catchphrase={`"${phrase[7]}"`} selection={marker} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} name={name[8]} villager={board[8]} catchphrase={`"${phrase[8]}"`} selection={marker} onSquareClick={() => handleClick(8)} />
            <Square value={squares[9]} name={name[9]} villager={board[9]} catchphrase={`"${phrase[9]}"`} selection={marker} onSquareClick={() => handleClick(9)} />
          </div>
          <div className="board-row">
            <h1 className={`titleSquare n ${isActive ? "bounce" : ""}`}>N</h1>
            <Square value={squares[10]} name={name[10]} villager={board[10]} catchphrase={`"${phrase[10]}"`} selection={marker} onSquareClick={() => handleClick(10)} />
            <Square value={squares[11]} name={name[11]} villager={board[11]} catchphrase={`"${phrase[11]}"`} selection={marker} onSquareClick={() => handleClick(11)} />
            {/* Free space: */}
            <Square value={squares[12]} name={""} villager={giftImg} catchphrase={"Free space"} selection={marker} onSquareClick={() => handleClick(12)} />
            <Square value={squares[13]} name={name[13]} villager={board[13]} catchphrase={`"${phrase[13]}"`} selection={marker} onSquareClick={() => handleClick(13)} />
            <Square value={squares[14]} name={name[14]} villager={board[14]} catchphrase={`"${phrase[14]}"`} selection={marker} onSquareClick={() => handleClick(14)} />
          </div>
          <div className="board-row">
            <h1 className={`titleSquare g ${isActive ? "bounce" : ""}`}>G</h1>
            <Square value={squares[15]} name={name[15]} villager={board[15]} catchphrase={`"${phrase[15]}"`} selection={marker} onSquareClick={() => handleClick(15)} />
            <Square value={squares[16]} name={name[16]} villager={board[16]} catchphrase={`"${phrase[16]}"`} selection={marker} onSquareClick={() => handleClick(16)} />
            <Square value={squares[17]} name={name[17]} villager={board[17]} catchphrase={`"${phrase[17]}"`} selection={marker} onSquareClick={() => handleClick(17)} />
            <Square value={squares[18]} name={name[18]} villager={board[18]} catchphrase={`"${phrase[18]}"`} selection={marker} onSquareClick={() => handleClick(18)} />
            <Square value={squares[19]} name={name[19]} villager={board[19]} catchphrase={`"${phrase[19]}"`} selection={marker} onSquareClick={() => handleClick(19)} />
          </div>
          <div className="board-row">
            <h1 className={`titleSquare o ${isActive ? "bounce" : ""}`}>O</h1>
            <Square value={squares[20]} name={name[20]} villager={board[20]} catchphrase={`"${phrase[20]}"`} selection={marker} onSquareClick={() => handleClick(20)} />
            <Square value={squares[21]} name={name[21]} villager={board[21]} catchphrase={`"${phrase[21]}"`} selection={marker} onSquareClick={() => handleClick(21)} />
            <Square value={squares[22]} name={name[22]} villager={board[22]} catchphrase={`"${phrase[22]}"`} selection={marker} onSquareClick={() => handleClick(22)} />
            <Square value={squares[23]} name={name[23]} villager={board[23]} catchphrase={`"${phrase[23]}"`} selection={marker} onSquareClick={() => handleClick(23)} />
            <Square value={squares[24]} name={name[24]} villager={board[24]} catchphrase={`"${phrase[24]}"`} selection={marker} onSquareClick={() => handleClick(24)} />
          </div>
        </div>
        {/* <div className="status">{isActive}</div> */}
        <ShuffleButton className="shuffle" onButtonClick={() => shuffleClick()}>Shuffle</ShuffleButton>

        <div className="buttonContainerContainer mx-auto col-7">
            <button onClick={() => markerPick(0)} className="buttonContainer btn btn-light btn-default">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Apple BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-25px -25px`,
                  width: `527px`,
                  height: `576px`,
                }}
              /></div>} 
              Apple
            </button>
            <button onClick={() => markerPick(1)} className="buttonContainer btn btn-light btn-default">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Cherry BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-18px -580px`,
                  width: `440px`,
                  height: `auto`,
                }}
              /></div>} 
              Cherry
            </button>
            <button onClick={() => markerPick(2)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Coconut BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-8px -268px`,
                  width: `420px`,
                  height: `auto`,
                }}
              /></div>} Coconut
            </button>
            <button onClick={() => markerPick(3)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Orange BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-13px -130px`,
                  width: `410px`,
                  height: `auto`,
                }}
              /></div>} Orange
            </button>
            <button onClick={() => markerPick(4)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Peach BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-26px -695px`,
                  width: `340px`,
                  height: `auto`,
                }}
              /></div>} Peach
            </button>
            <button onClick={() => markerPick(5)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Pear BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-13px -630px`,
                  width: `380px`,
                  height: `auto`,
                }}
              /></div>} Pear
            </button>
            <button onClick={() => markerPick(6)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Bells BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-8px -345px`,
                  width: `360px`,
                  height: `auto`,
                }}
              /></div>} Bells
            </button>
            <button onClick={() => markerPick(7)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={markerSprite}
                alt="Fossil BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `-20px -460px`,
                  width: `130px`,
                  height: `auto`,
                }}
              /></div>} Fossil
            </button>
            <button onClick={() => markerPick(8)} className="buttonContainer btn btn-light">
              {<div className="crop">
                <img 
                className="buttonMarker"
                src={giftImg}
                alt="Gift BINGO marker" 
                style={{
                  objectFit: `cover`,
                  objectPosition: `0px -7px`,
                  width: `100px`,
                  height: `auto`,
                }}
              /></div>} Gift
            </button>
        </div>
      </div>
      <Footer />
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