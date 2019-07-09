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

export async function logout() {
    log.debug('auth.js signout')
    try {
        await getAuth().signOut()
    } catch(e) {}
};

export function onAuthStateChanged(callback) {
    log.debug('auth.js onAuthStateChanged')
    const auth = getAuth()
    return auth.onAuthStateChanged(callback)
}