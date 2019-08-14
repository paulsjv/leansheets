import * as db from './database/database'
import log from './logger'

// user model
// { 
//     uid: string, 
//     displayName: string,
//     photoURL: string,
//     joined: date
// }

export async function update(user) {
    log.debug('user.js - update user:', user)
    try {
        const { uid } = user
        await db.set(`users/${uid}`, user)
    } catch(e) {
        log.error('user.js - update error', e)
        throw e
    }
}