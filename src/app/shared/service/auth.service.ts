import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {
    AngularFirestoreDocument,
    AngularFirestore,
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData;
    constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
        afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    doAccess(email: string, pass: string) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth
                .signInWithEmailAndPassword(email, pass)
                .then((res) => {
                    this.setUserData(res.user);
                    resolve(res);
                })
                .catch((err) => resolve(err));
        });
    }

    doRegister(email: string, pass: string) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth
                .createUserWithEmailAndPassword(email, pass)
                .then((res) => {
                    this.setUserData(res.user);
                    resolve(res);
                })
                .catch((err) => resolve(err));
        });
    }

    forgotPassword(email: string) {
        this.afAuth.sendPasswordResetEmail(email);
    }

    doFacebookSignup() {
        let provider = new auth.FacebookAuthProvider();
        provider.addScope('email');
        return this.authSignin(provider);
    }

    doGoogleSignup() {
        let provider = new auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        return this.authSignin(provider);
    }

    authSignin(provider) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth
                .signInWithPopup(provider)
                .then((res) => {
                    this.setUserData(res.user);
                    resolve(res);
                })
                .catch((err) => resolve(err));
        });
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        this.userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        };
        userRef.set(this.userData, {
            merge: true,
        });
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null && user.emailVerified !== false ? true : false;
    }

    doSignout() {
        this.afAuth.signOut();
        localStorage.setItem('user', '');
    }
}
