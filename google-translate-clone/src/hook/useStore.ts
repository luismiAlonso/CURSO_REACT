import { AUTO_LANGUAGE } from '../constants'
import { type State, Action, Language, FromLanguage } from '../types'
import { useReducer } from 'react'

//1-estado inicial
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }
  

export function reducer(state: typeof initialState, action: Action){
  const { type } = action

  if(type === 'INTERCHANGE_LANGUAGES'){

    if(state.fromLanguage === AUTO_LANGUAGE) return false

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if(type === 'SET_FROM_LANGUAGE'){
    return {
      ...state,
      fromLanguage: action.payload
    }
  }
  if(type === 'SET_TO_LANGUAGE'){
    return {
      ...state,
      toLanguage: action.payload
    }
  }
  if(type === 'SET_FROM_TEXT'){
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }
  if(type === 'SET_RESULT'){
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }
  
  return state
}

export function useStore() {

    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
      }, dispatch] = useReducer(reducer, initialState)

      const interChangeLanguages = () =>{
        dispatch({ type: 'INTERCHANGE_LANGUAGES'})
      }
      const setFromLanguage = (payload: FromLanguage) =>{
        dispatch({ type:'SET_FROM_LANGUAGE', payload})
      }
      const setToLanguage  = (payload: Language) =>{
        dispatch({ type:'SET_TO_LANGUAGE', payload})
      }
      const setFromText = (payload: string) =>{
        dispatch({ type: 'SET_FROM_TEXT', payload})
      }
      const setResult = (payload: string) =>{
        dispatch({ type: 'SET_RESULT', payload})
      }
      return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interChangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
      }
}