import './App.css'
import { Dasboard } from './components/dasboard'
import { Route, Routes } from 'react-router-dom'
import { Facturas } from './pages/facturas'
import { Otro } from './pages/otro'


function App() {

  return (
    <div className='container'>
      <main>
        <aside className=''>
            <Dasboard  />
        </aside>
        <aside className='playContent'>
            <div>
              <Routes >
                <Route  path="/facturas" element={<Facturas />} />
                <Route  path="/" element={<Otro />} />
              </Routes >
            </div>
        </aside>
      </main>
    </div>
  )
}

export default App
