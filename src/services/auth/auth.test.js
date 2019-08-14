import * as Auth from './auth'
import * as User from '../user'
import * as facade from '../database/database.facade'

// https://stackoverflow.com/questions/40465047/how-can-i-mock-an-es6-module-import-using-jest
// https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

it('calls the mock of getAuth', () => {
    jest.spyOn(facade, 'getAuth')
    Auth.logout()
    expect(facade.getAuth).toHaveBeenCalled()
})

it('calls the mock of the auth.signOut', async () => {
    const signOutMock = { signOut: jest.fn() } 
    const authMock = () => signOutMock
    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    Auth.logout()
    expect(facade.getAuth).toHaveBeenCalled()
    expect(signOutMock.signOut).toHaveBeenCalled()
})

it('calls the mock of auth.onAuthStateChanged(callback)', () => {
    const cb = jest.fn()
    const onAuthStateChangedMock = jest.fn()
    const authMockFirebase = jest.fn(() => { return { onAuthStateChanged: onAuthStateChangedMock } })
    const authMockLocalStorage = jest.fn(() => { return { onAuthStateChanged: onAuthStateChangedMock } })
    const authMockThirdParty = jest.fn(() => { return { onAuthStateChanged: onAuthStateChangedMock } })
    
    jest.spyOn(facade, 'getAuthImplementations').mockImplementation(() => [ authMockLocalStorage, authMockFirebase, authMockThirdParty ] )
    
    expect(Auth.onAuthStateChanged(cb).length).toBe(3)
    expect(facade.getAuthImplementations).toHaveBeenCalled()
    expect(authMockFirebase).toHaveBeenCalled()
    expect(authMockLocalStorage).toHaveBeenCalled()
    expect(onAuthStateChangedMock).toHaveBeenCalled()
    expect(onAuthStateChangedMock).toBeCalledWith(cb)
})

it('calls the mock of auth.signInWithPopup(provider)', async () => {
    const provider = {}
    const GoogleAuthProviderMock = jest.fn(() => provider)
    const signInWithPopupMock = { signInWithPopup: jest.fn(prod => 'test123') }
    let authMock = () => signInWithPopupMock
    authMock.GoogleAuthProvider = GoogleAuthProviderMock    

    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    jest.spyOn(signInWithPopupMock, 'signInWithPopup')

    try {
        await Auth.googleSignIn()
    } catch (e) {
        expect(e).toBeNull()
    }
    expect(facade.getAuth).toHaveBeenCalled()
    expect(authMock.GoogleAuthProvider).toHaveBeenCalled()
    expect(signInWithPopupMock.signInWithPopup).toHaveBeenCalled()
    expect(signInWithPopupMock.signInWithPopup).toBeCalledWith(provider)
})

it('calls the mock of auth.signInWithPopup(provider) and throws error', async () => {
    const provider = {}
    const GoogleAuthProviderMock = jest.fn(() => provider)
    const signInWithPopupMock = { signInWithPopup: jest.fn(prod => { throw new Error() } ) }
    let authMock = () => signInWithPopupMock
    authMock.GoogleAuthProvider = GoogleAuthProviderMock    

    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    jest.spyOn(signInWithPopupMock, 'signInWithPopup')

    try {
        expect(await Auth.googleSignIn()).toThrow()
    } catch (e) {
        expect(e).not.toBeNull()
    }
    expect(facade.getAuth).toHaveBeenCalled()
    expect(authMock.GoogleAuthProvider).toHaveBeenCalled()
    expect(signInWithPopupMock.signInWithPopup).toHaveBeenCalled()
    expect(signInWithPopupMock.signInWithPopup).toBeCalledWith(provider)
})

test.skip('calls the mock auth().guestSignIn', async () => {
    const signInWithEmailAndPasswordMock = jest.fn()
    const authMock = () => ({ signInWithEmailAndPassword: signInWithEmailAndPasswordMock })
    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    jest.spyOn(facade, 'setUseLocalStorage').mockImplementation(jest.fn())

    try {
        await Auth.guestSignIn()
        expect(facade.getAuth).toHaveBeenCalled()
        expect(facade.setUseLocalStorage).toHaveBeenCalled()
        expect(signInWithEmailAndPasswordMock).toHaveBeenCalled()
    } catch(e) { throw e }
})

test.skip('calls the mock auth().guestSignIn and throws and error', async () => {
    const signInWithEmailAndPasswordMock = jest.fn(() => { throw new Error() })
    const authMock = () => ({ signInWithEmailAndPassword: signInWithEmailAndPasswordMock })
    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    jest.spyOn(facade, 'setUseLocalStorage').mockImplementation(jest.fn())

    try {
        await Auth.guestSignIn()
    } catch(e) { 
        expect(facade.getAuth).toHaveBeenCalled()
        expect(facade.setUseLocalStorage).toHaveBeenCalled()
        expect(signInWithEmailAndPasswordMock).toHaveBeenCalled()
        expect(e).not.toBeNull()
    }
})

it('calls the mock auth().guestSignUp', async () => {
    // GIVE: there is a user 
    //  AND a mock auth implementation
    const user = {
        email: '',
        password: '',
        displayName: 'Guest',
        photoURL: '',
        joined: new Date()
    }

    const updateProfileMock = jest.fn()
    const userMock = { user: { ...user, updateProfile: updateProfileMock }}
    const createUserWithEmailAndPasswordMock = jest.fn(() => userMock)
    const authMock = () => ({ createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock })
    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    jest.spyOn(facade, 'setUseLocalStorage').mockImplementation(jest.fn())
    jest.spyOn(User, 'update').mockImplementation(jest.fn())
    
    try {
        // WHEN: guestSignUp is called with a user
        await Auth.guestSignUp(user)

        // THEN: expect the following functions to have been called
        expect(updateProfileMock).toHaveBeenCalled()
        expect(createUserWithEmailAndPasswordMock).toHaveBeenCalled()
        expect(facade.getAuth).toHaveBeenCalled()
        expect(User.update).toHaveBeenCalled()
    } catch(e) { throw e }
})