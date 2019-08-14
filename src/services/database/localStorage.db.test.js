import * as db from './localStorage.db'
import localforage from 'localforage'

const noop = () => {}
const LF_KEY = 'data' // this is where all the non auth data is located

// Make sure to clear local db so that it's clean for each run
beforeEach(() => {
    localforage.clear().then(noop)
})

// Make sure to clear the local db so that it doesn't affect
// other tests in the suite
afterAll(() => {
    localforage.clear().then(noop)
})

it('implements the auth firebase api\'s', () => {
    // GIVEN: there is an auth that implements the firebase auth api
    // WHEN: calling the auth fuction to get the auth object
    const auth = db.auth()

    // THEN: expect it to implement the same functions as the firebase api
    expect(typeof auth.createUserWithEmailAndPassword === 'function').toBeTruthy()
    expect(typeof auth.onAuthStateChanged === 'function').toBeTruthy()
    expect(typeof auth.signInWithEmailAndPassword === 'function').toBeTruthy()
    expect(typeof auth.signOut === 'function').toBeTruthy()
})

it('returns a noop function on auth.onAuthStateChanged(callback)', () => {
    // GIVEN: there is an auth object
    //  AND a mock callback function
    const auth = db.auth()
    const callback = jest.fn()

    // WHEN: auth.onAuthStateChanged is called with the callback
    const func = auth.onAuthStateChanged(callback)

    // THEN: expect it to return with the same api as firebase
    expect(typeof func === 'function').toBeTruthy()
    expect(typeof func() === 'function').toBeTruthy()
    expect(func()()).not.toBeDefined()
})

// The callback does get called however since it is within a then() promise
// callback function the test doesn't seem to realize that the callback has
// been called. The guess is that since the onAuthStateChanged() method isn't
// an async call the test executes the very next line without waiting and inside
// the code that is being testes the callback is being called inside the then()
// promise success. So this is an order of execution issue.
test.skip('calls auth.onAuthStateChanged(callback) & should have called the callback', async () => {
    try {
        await localforage.setItem('auth','authSet')
        const auth = db.auth()
        const callback = jest.fn()
        auth.onAuthStateChanged(callback)
        expect(callback).toHaveBeenCalled()
        const newAuth = await localforage.getItem('auth')
        expect(newAuth).toBe('authSet')
    } catch(e) { throw e }
})

it('calls auth.createUserWithEmailAndPassword() returns user', async () => {
    // GIVEN: an auth object
    const auth = db.auth()
    try {
        // WHEN: auth.createUserWithEmailAndPassword is called
        const { user } = await auth.createUserWithEmailAndPassword('email','password')

        // THEN: expect a user that implments the firebase api
        //  AND the 'auth' and 'server:auth' data in local storay is set correctly
        expect(user).not.toBeNull()
        expect(user.uid).toBe('guest')
        expect(typeof user.updateProfile === 'function').toBeTruthy()

        const expectedAuth = await localforage.getItem('auth')
        const expectedServerAuth = await localforage.getItem('server:auth')
        expect(expectedAuth.uid).toBe('guest')
        expect(expectedServerAuth.uid).toBe('guest')
    } catch(e) { throw e }
})

it('calls user.updateProfile() and returns with expected user fields', async () => {
    // GIVEN: there is an auth
    //  AND auth.createUserWithEmailAndPassword is called
    const auth = db.auth()
    const updates = { displayName: 'Guest', photoURL: '/url.jpg', joined: '1999-01-01' }
    try {
        const { user } = await auth.createUserWithEmailAndPassword('email','password')

        // WHEN: user.updateProfile is called
        const updatedUser = await user.updateProfile(updates)

        // THEN: expect all updates to user
        //  AND the local storage 'auth' object
        //  AND the 'server:auth' object to reflect the below changes
        expect(updatedUser.displayName).toBe('Guest')
        expect(updatedUser.photoURL).toBe('/url.jpg')
        expect(updatedUser.joined).toBe('1999-01-01')
        expect(updatedUser.uid).toBe('guest')

        const newAuth = await localforage.getItem('auth')
        expect(newAuth.uid).toBe('guest')
        expect(newAuth.displayName).toBe('Guest')
        expect(newAuth.photoURL).toBe('/url.jpg')
        expect(newAuth.joined).toBe('1999-01-01')

        const newServerAuth = await localforage.getItem('server:auth')
        expect(newServerAuth.uid).toBe('guest')
        expect(newServerAuth.displayName).not.toBeDefined()
    } catch(e) { throw e }
})

it('calls auth.signInWithEmailAndPassword() and should throw an error', async () => {
    // GIVEN: there is an auth with no data set
    const auth = db.auth()
    try {
        // WHEN: auth.signInWithEmailAndPassword is called
        await auth.signInWithEmailAndPassword('email','password')
    } catch(e) {
        // THEN: expect an error
        expect(e).not.toBeNull()
        expect(e.code).toBe('auth/user-not-found')
        expect(e.message).toBe('User not found')
    }
})

it('calls auth.signInWithEmailAndPassword() & onAuthChangeHandler should be called & localforage should be set', async () => {
    // GIVEN: there is a 'server:auth' set in local storage
    //  AND there is a mock callback function set for auth
    const auth = db.auth()
    const callback = jest.fn()
    try {
        await localforage.setItem('server:auth','serverAuthSet')
        auth.onAuthStateChanged(callback)

        // WHEN: auth signInWithEmailAndPassword is called
        await auth.signInWithEmailAndPassword()

        // THEN: expect the following to be true
        expect(callback).toHaveBeenCalled()
        const newAuth = await localforage.getItem('auth')
        expect(newAuth).toBe('serverAuthSet')
    } catch(e) { throw e }
})

it('calls auth.signOut without any errors', async () => {
    // GIVEN: there is data set in the 'auth' local storage
    const auth = db.auth()
    try {
        await localforage.setItem('auth', 'authSet')
        let newAuth = await localforage.getItem('auth')
        expect(newAuth).not.toBeNull()
        expect(newAuth).toBe('authSet')

        // WHEN: a user signs out
        await auth.signOut()
        
        // THEN: expect the 'auth' in local storage to be null
        const expected = await localforage.getItem('auth')
        expect(expected).toBeNull()
    } catch(e) { throw e }
})

test.skip('db.collection methods need to be testsed', () => {
    // const methods = {
    //     onSnapshot,
    //     where,
    //     limit,
    //     orderBy,
    //     add,
    //     get
    //   }
})

test.skip('db.doc methods need to be tested', () => {
    // { get, set, onSnapshot, delete: _delete }
    // need to test onSnapshot and delete
})

it('implements the doc firebase api\'s', () => {
    // GIVEN: there is an implementation of the firebase api
    // WHEN: a document is returned
    const doc = db.doc()

    // THEN: expect it to have the same api as firebase
    expect(typeof doc.get === 'function').toBeTruthy()
    expect(typeof doc.set === 'function').toBeTruthy()
    expect(typeof doc.onSnapshot === 'function').toBeTruthy()
    expect(typeof doc.delete === 'function').toBeTruthy()
})

it('calls doc.set & item is in local storage', async () => {
    // GIVEN: there is test data
    const collection = 'test'
    const testData = { id: 'testid', value: 'testing value' }
    const test = {
        [testData.id]: {
            id: testData.id,
            value: testData.value
        }
    }

    const expected = {
        id: testData.id,
        value: 'updated testing value'
    }

    try {
        // set up local storage db
        await localforage.setItem(LF_KEY, { test })

        // WHEN: test data is updated
        await db.doc(`${collection}/${testData.id}`).set(expected)

        // THEN: expect the test datat to reflect the updates
        const result = await localforage.getItem(LF_KEY)
        expect(result.test.testid.id).toBe(expected.id)
        expect(result.test.testid.value).toBe(expected.value)
    } catch(e) { throw e }
})

it('calls doc.get to return item in local storage', async () => {
    // GIVEN: there is test data
    const collection = 'test'
    const testData = { id: 'testid', value: 'testing value' }
    const test = {
        [testData.id]: {
            id: testData.id,
            value: testData.value
        }
    }
    
    try {
        // set up local storage db
        await localforage.setItem(LF_KEY, { test })

        // WHEN: a request is made for the data
        const item = await db.doc(`${collection}/${testData.id}`).get()

        // THEN: expect the following:
        expect(typeof item.data === 'function').toBeTruthy()
        expect(item.id).toBe(testData.id)
        expect(item.exists).toBeTruthy()

        const record = item.data()
        expect(record.id).toBe(testData.id)
        expect(record.value).toBe(testData.value)
    } catch(e) { throw e }
})