import {Square} from "./Square.jsx"

export const Tablero =({board,updateBoard})=>{
    
  return (
    board.map((_, index)=>{
      return (  
       <Square 
       key={index}
       index={index}
       updateBoard={updateBoard}
       >
        {board[index]}
       </Square>
      )
    })
    )
}