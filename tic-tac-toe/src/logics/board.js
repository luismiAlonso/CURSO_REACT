import {TURNS, WINNER_COMBOS} from '../constantes.js'

//checkea ganador
export const checkWinnerFrom = (boardToCheck)=>{
    //revisamos combinaciones ganadoras
    for (const combo of WINNER_COMBOS){

      const [a, b, c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
}

export const checkEndGame = (newBoard)=>{
    //revisamos si hay un empate
    //si no hay mas espacios vacios
    //en el tablero
    return newBoard.every((Square) =>Square !== null)
  }

/*
export const updateBoard = (index,board,winner) =>{

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
    //checkeamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);

    if(newWinner){
  
      confetti()
      setWinner(newWinner)
      
    }else if(checkEndGame(newBoard)){ //checkeamos final por empate
      setWinner(false)
    }

}  */

