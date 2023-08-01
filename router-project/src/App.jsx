import { Suspense, lazy } from 'react'

import { Router } from './Router'
import { Route } from './Route'
import SearchPage from './pages/Search'
import './App.css'

const Page404 =lazy(()=>import ('./pages/404'))
const HomePage =lazy(()=>import ('./pages/Home'))
const AboutPage =lazy(()=>import ('./pages/About'))

const routes = [
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
