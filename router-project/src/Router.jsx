import { EVENTS } from "./consts.js"
import { useState, useEffect, Children } from "react"
import { match } from 'path-to-regexp'

export function Router ({ children ,routes = [], defaultComponent: DefaultCOmponent = () => <h1>404</h1>}){
   
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
    useEffect(() =>{
  
      const onLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }
  
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)
      }
    }, [])
  
      let routeParams = {}

      //add routes from children
      const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === 'Route'
        return isRoute ? props : null
      })
      
      const routesToUse = routes.concat(routesFromChildren)

      const Page = routesToUse.find(({path}) => {
        if (path === currentPath) return true

        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if(!matched) return false

        routeParams = matched.params
        return true

      })?.Component

      return Page ? <Page routeParams={routeParams} />  : <DefaultCOmponent routeParams={routeParams} />
}