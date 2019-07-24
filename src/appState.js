import React, { createContext, useReducer, useContext } from 'react'
import log from './services/logger'

const Context = createContext()

export function AppStateProvider({ reducer, initialState = {}, children }) {
  log.debug('2. appState.js - AppStateProvider()')
  log.debug('initialState', initialState)
  // useReducer returns [ state, dispatch ] 
  // state can be any obeject 
  const value = useReducer(reducer, initialState)
  return <Context.Provider value={value} children={children} />
}

export function useAppState() {
  log.debug('5. appState.js - useAppState()')
  // so when useContext returns a value it's actually whatever
  // useReducer is returning because that's what the Provider's 
  // value is assigned to.
  return useContext(Context)
}