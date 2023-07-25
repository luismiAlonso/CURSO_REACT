import './App.css'
import { FollowMouse } from './components/followMouse'

function App() {

  /*
  const [mounted, setMounted] = useState(true)
  
  return (
    <main>
     {mounted && <FollowMouse />}
     <button onClick={()=>setMounted(!mounted)}>Toggle mounted</button>
    </main>
  )*/

  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
