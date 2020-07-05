import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(public afAuth: AngularFireAuth) {}

    doRegister(email: string, pass: string) {
        return new Promise<any>((resolve, reject) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then((res) => resolve(res))
                .catch((err) => resolve(err));
        });
    }

    doFacebookSignup() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth
                .signInWithPopup(provider)
                .then((res) => resolve(res))
                .catch((err) => resolve(err));
        });
    }

    doGoogleSignup() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth
                .signInWithPopup(provider)
                .then((res) => resolve(res))
                .catch((err) => resolve(err));
        });
    }

    doSignout() {
        this.afAuth.signOut();
    }
}
