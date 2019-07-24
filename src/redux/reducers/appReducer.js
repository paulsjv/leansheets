import log from '../../services/logger'
import * as Actions from '../actions/appActions'

const initialState = { authAttempted: false, auth: null, user: null }

const appStateReducer = (state, action) => {
  switch (action.type) {
    case Actions.AUTH_CHANGE: {
      log.debug('10. appReducer.js - appStateReducer() - AUTH_CHANGE')
      log.debug('appReducer - action.type', action.type)
      log.debug('appReducer - action.auth', action.auth)
      return { ...state, auth: action.auth, authAttempted: true }
    }
    case Actions.LOAD_USER: {
      log.debug('appReducer - action.type', action.type)
      log.debug('appReducer - action.user', action.user)
      return { ...state, user: action.user }
    }
    default:
      return state
  }
}

export { initialState }
export default appStateReducer