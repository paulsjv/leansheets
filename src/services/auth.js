import { getAuth } from './database.facade';

const auth = getAuth();

export async function googleSignIn() {
    console.log(auth)
    const provider = new auth.GoogleAuthProvider();
    let credential = null;
    try {
        credential = await auth().signInWithPopup(provider);
    } catch(e){
        throw e
    }
};

export async function logout() {
    auth().signOut();
};

export function onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback)
}