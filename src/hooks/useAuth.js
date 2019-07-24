import { useEffect } from 'react'
import { onAuthStateChanged } from '../services/auth'
import { useAppState } from '../appState'
import log from '../services/logger'
import * as Actions from '../redux/actions/appActions'

export default function useAuth() {
  log.debug('4. useAuth.js - useAppState()')
  const [ { authAttempted, auth }, dispatch] = useAppState()
  
  useEffect(() => {
    // sets up the call back function that auth is going to use 
    // with firebase every time there is a signin or signout
    log.debug('6. useAuth.js - useEffect()')
    log.debug('useEffect() when dispatched is called it redarws the react dom')
    log.debug('Setting callback for firebase auth signin/out onAuthStateChanged()')
    // this returns a firebase.auth.Unsubscribe as the cleanup function
    const unsubscribe =  onAuthStateChanged(auth => {
      log.debug('8. useAuth.js - useEffect() callback')
      if (auth) {
        const { displayName, photoURL, uid } = auth
        log.debug('9. (if loogged in) useAuth.js - useEffect() dispatch action:', Actions.AUTH_CHANGE, auth)
        dispatch({
          type: Actions.AUTH_CHANGE,
          auth: { displayName, photoURL, uid }
        })
      } else {
        log.debug('9. (if logged out) useAuth.js - useEffect() dispatch action:', Actions.AUTH_CHANGE, auth)
        dispatch({ type: Actions.AUTH_CHANGE, auth: null })
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return { authAttempted, auth }
}