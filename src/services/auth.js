import { getAuth } from './database.facade'
import log from './logger'

export async function googleSignIn() {
    const auth = getAuth()
    const provider = new auth.GoogleAuthProvider()
    try {
        log.debug('auth.js - googleSignIn - calling Google sign in')
        await auth().signInWithPopup(provider)
    } catch(e){
        log.error('auth.js error', e)
        throw e
    }
};

export function logout() {
    log.debug('auth.js signout')
    try {
        const auth = getAuth()
        auth().signOut()
    } catch(e) {
        log.error('auth.js error', e)
        throw e
    }
};

export function onAuthStateChanged(callback) {
    log.debug('7. auth.js onAuthStateChanged(cb)')
    const auth = getAuth()
    // returns a firebase.auth.Unsubscribe which is needed
    // for the useEffect from the useAuth hook for cleanup
    return auth().onAuthStateChanged(callback)
}