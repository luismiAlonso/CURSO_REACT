import { useEffect, useState } from 'react'

export const FollowMouse =() =>{

    const [enabled, setEnabled] = useState(false)
    const [position,setPosition] = useState({x :0, y: 0});
  
    useEffect(() => {
      console.log('effect', { enabled })
  
      const handleMove = (event) => {
        const { clientX, clientY } = event
        console.log('handleMove', { clientX, clientY });
        setPosition({x: clientX, y: clientY})
      }
  
      if (enabled){
        window.addEventListener('pointermove', handleMove)
      }
  
      return () =>{
        window.removeEventListener('pointermove',handleMove)
      }
  
    }, [enabled])
    return (
        <>
        <div style={{transform:`translate(${position.x}px, ${position.y}px)`}} className='bolita' ></div>
        <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : ' Activar'} puntero
        </button>
        </>
    )
}