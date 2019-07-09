import * as Auth from './auth'
import * as facade from './database.facade'

// https://stackoverflow.com/questions/40465047/how-can-i-mock-an-es6-module-import-using-jest
// https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

it('calls the mock of getAuth', () => {
    jest.spyOn(facade, 'getAuth')
    Auth.logout()
    expect(facade.getAuth).toHaveBeenCalled()
})

it('calls the mock of the auth.signOut', async () => {
    const authMock = { signOut: jest.fn() }
    jest.spyOn(authMock, 'signOut')
    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    Auth.logout()
    expect(facade.getAuth).toHaveBeenCalled()
    expect(authMock.signOut).toHaveBeenCalled()
})

it('calls the mock of auth.onAuthStateChanged(callback)', () => {
    const cb = jest.fn()
    const authMock = { onAuthStateChanged: func => {} }
    jest.spyOn(authMock, 'onAuthStateChanged')
    jest.spyOn(facade, 'getAuth').mockImplementation(() => authMock)
    Auth.onAuthStateChanged(cb)
    expect(facade.getAuth).toHaveBeenCalled()
    expect(authMock.onAuthStateChanged).toHaveBeenCalled()
    expect(authMock.onAuthStateChanged).toBeCalledWith(cb)
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