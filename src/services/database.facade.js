import { db, auth } from './database.fb';

/**
 * function getDb()
 * Wrapper if there is no access to firebase then this fuction cn return
 * a different db store
 */
export function getDb() {
    return db;
}

/**
 * function getAuth()
 * Wrapper if there is no access to firebase then this function can return
 * a different auth store
 */
export function getAuth() {
    return auth;
}