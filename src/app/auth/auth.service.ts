import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { 
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
	  console.log('authenicated');
	  const appUser: User = { 
		  uid: user.uid, 
		  email: user.email, 
		  displayName: user.displayName, 
		  photoURL: user.photoURL 
	  }; 
          return of(appUser);
	} else {
	  console.log('not authenicated');
	  return of(null);
	}
      })
    )
  };

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log("googleSignIn");
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    console.log("signOut");
    return this.router.navigate(['/login']);
  }
 
  updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${uid}`);

    const data = { uid, email, displayName, photoURL };
    console.log(data);
    return userRef.set(data, { merge: true });
  }
}
