import { AUTO_LANGUAGE, SUPORTED_LEGUAGES } from "./constants"

export type Language = keyof typeof SUPORTED_LEGUAGES
export type Autolanguage = typeof AUTO_LANGUAGE 
export type FromLanguage = Language | Autolanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
    | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
    | { type: 'INTERCHANGE_LANGUAGES'}
    | { type: 'SET_TO_LANGUAGE', payload: Language}
    | { type: 'SET_FROM_TEXT', payload: string}
    | { type: 'SET_RESULT', payload: string}

export enum SectionType {
    From = 'from',
    To = 'to'
}