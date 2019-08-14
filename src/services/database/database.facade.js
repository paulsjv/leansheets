import { fbDb, fbAuth } from './firebase.db';
import { auth, db } from '../database/localStorage.db'

let useLocalStorage = false;

// Exporting so that when application loads the useAuth hook
// can set the callback for both firebase and localstorage
// in the auth.js onAuthStateChanged() method.
// Without this there is no callback for localstorate that is
// setup and the app doesn't work correctly.
export function getAuthImplementations() { return [ fbAuth, auth ] }

export function setUseLocalStorage(boolean) {
    useLocalStorage = boolean
}

/**
 * function getDb()
 * Wrapper if there is no access to firebase then this fuction cn return
 * a different db store
 */
export function getDb() {
    // TODO: check which db is being used and return correct one
    return useLocalStorage ? db : fbDb;
}

/**
 * function getAuth()
 * Wrapper if there is no access to firebase then this function can return
 * a different auth store
 */
export function getAuth() {
    return useLocalStorage ? auth : fbAuth
}