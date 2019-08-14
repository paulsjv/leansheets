import { 
    getAuth, 
    setUseLocalStorage,
    getAuthImplementations
} from '../database/database.facade'
import * as User from '../user'
import { format } from 'date-fns'
import log from '../logger'

export async function guestSignIn() {
    setUseLocalStorage(true)
    const auth = getAuth()
    try {
        log.debug('auth.js - guestSignIn - should use localStorage')
        await auth().signInWithEmailAndPassword()
    } catch(e) {
        setUseLocalStorage(false)
        log.error('auth.js error with guestSignIn', e)
        throw e
    }
}

export async function guestSignUp({
    email = '',
    password = '',
    displayName = 'Guest',
    photoURL = '',
    joined = new Date()
  }) {
    setUseLocalStorage(true)

    const auth = getAuth()
    try {
        const { user } = await auth().createUserWithEmailAndPassword(email, password)
        await user.updateProfile({ displayName, photoURL })
        log.debug('auth.js - guestSignUp', user)
        await User.update({
            displayName: displayName,
            photoURL: photoURL,
            uid: user.uid,
            joined: format(joined, 'yyyy-MM-dd')
        })
    } catch(e) {
        setUseLocalStorage(false)
        log.error('auth.js error with guestSignUp', e)
        throw e
    }
}

export async function googleSignIn() {
    const auth = getAuth()
    const provider = new auth.GoogleAuthProvider()
    try {
        log.debug('auth.js - googleSignIn - calling Google sign in')
        await auth().signInWithPopup(provider)
    } catch(e){
        log.error('auth.js error with googleSignIn', e)
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
    // returns a firebase.auth.Unsubscribe which is needed
    // for the useEffect from the useAuth hook for cleanup
    // return auth().onAuthStateChanged(callback)
    return getAuthImplementations().map(auth => auth().onAuthStateChanged(callback))
}