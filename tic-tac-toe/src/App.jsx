import { useState } from 'react'
import {Square} from "./components/Square.jsx"
import {WinnerModal} from './components/winnerModal.jsx'
import {Tablero} from './components/Tablero.jsx'
import confetti from "canvas-confetti"
import {TURNS} from './constantes.js'
import {checkWinnerFrom,checkEndGame} from './logics/board.js'
import { saveGameStorage,resetGameStorage } from './storage/index.js'
import './App.css'

function App() {

  
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')  
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn,setTurn] = useState(()=>{
    const turnFromStorage =  window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });

  const [winner,setWinner] = useState(null) //null no hay ganador y false empate

  const resetGame = () =>{

    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    
    resetGameStorage()
  }

  //console.log(board);
  const updateBoard = (index) =>{

    //no actualizamos si ya ha sido seleccionada
    //si ya tiene algo
    if(board[index] || winner) return
    //actualizamos tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard) //actualizamos ASINCRONA
    //cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) 
    //guardar partida estado del tablero
    
    saveGameStorage({board:newBoard,turn:newTurn})
    //checkeamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);

    if(newWinner){
  
      confetti()
      setWinner(newWinner)
      
    }else if(checkEndGame(newBoard)){ //checkeamos final por empate
      setWinner(false)
    }

  }

  /*
  useEffect(()=>{
    //se ejecuta una vez al inicia y otra cuando cambia la dependecia introducida
    saveGameStorage({
      board:newBoard,
      turn:newBoard
    })
  },[winner,turn])*/

  return (

    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
       <Tablero board={board} updateBoard={updateBoard} />
      </section>
      <section className='turn'>
        <Square isSelected = {turn === TURNS.X }>
          {TURNS.X}
        </Square>
        <Square isSelected= {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal  resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
