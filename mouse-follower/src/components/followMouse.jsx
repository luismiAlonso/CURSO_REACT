import { useEffect, useState } from 'react'

export const FollowMouse =() =>{

    const [enabled, setEnabled] = useState(false)
    const [position,setPosition] = useState({x :0, y: 0});
  
    //pointer follow effect
    useEffect(() => {
      console.log('effect', { enabled })
  
      const handleMove = (event) => {
        const { clientX, clientY } = event
        //console.log('handleMove', { clientX, clientY });
        setPosition({x: clientX, y: clientY})
      }
  
      if (enabled){
        window.addEventListener('pointermove', handleMove)
      }
      
      //el clean se lanza antes de desmontar el componente y cuando se desmonta
      return () =>{ //metodo de limpieza
        console.log("CLEAN")
        window.removeEventListener('pointermove',handleMove)
      }
  
    }, [enabled])

    //change class pointer
    useEffect(()=>{
      document.body.classList.toggle('no-cursor', enabled)

      return () =>{
        document.body.classList.remove('no-cursor')
      }
    },[enabled])

    return (
        <>
        <div style={{transform:`translate(${position.x}px, ${position.y}px)`}} className='bolita' ></div>
        <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : ' Activar'} puntero
        </button>
        </>
    )
}