import React from 'react'

import './App.css'
import Layout from './components/Layout/Layout'
import LoginForm from './containers/LoginForm/LoginForm'
import { AppStateProvider } from './appState'
import appReducer, { initialState } from './redux/reducers/appReducer'
import useAuth from './hooks/useAuth'
import log from './services/logger'
import { logout } from './services/auth/auth'

function SignOut() {
  const handleLogout = () => {
    logout()
  }
  return (
    <button onClick={handleLogout}>LogOut</button>
  )
}

function App() {
  log.debug('3. App.js - useAuth()')
  const { authAttempted, auth } = useAuth()
  log.debug('App.js - authAttempted', authAttempted)
  if (!authAttempted) return null
  return (
    <div>
      <Layout>
        LeanSheets
        { auth ? <SignOut /> : <LoginForm /> }
      </Layout>
    </div>
  )
}

export default () => {
  log.debug('1. App.js default () =>{}')
  return (
    <AppStateProvider reducer={appReducer} initialState={initialState}>
      <App />
    </AppStateProvider>
  )}
