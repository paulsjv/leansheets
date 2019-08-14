import { getDb } from './database.facade'
import log from '../logger'

export async function set(collection = null, obj) {
    const db = getDb()
    try {
        await db.doc(collection).set(obj)
    } catch(e) {
        log.error('database.js - set error', e)
        throw e
    }
}