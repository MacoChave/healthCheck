import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {
    AngularFirestoreDocument,
    AngularFirestore,
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData;
    constructor(
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public router: Router,
        public ngZone: NgZone
    ) {
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
        this.afAuth
            .signInWithEmailAndPassword(email, pass)
            .then((res) => {
                this.ngZone.run(() => this.router.navigate(['home']));
                this.setUserData(res.user);
            })
            .catch((err) => window.alert(err.message));
    }

    doRegister(email: string, pass: string) {
        this.afAuth
            .createUserWithEmailAndPassword(email, pass)
            .then((res) => {
                this.ngZone.run(() => this.router.navigate(['home']));
                this.setUserData(res.user);
            })
            .catch((err) => window.alert(err.message));
    }

    forgotPassword(email: string) {
        this.afAuth.sendPasswordResetEmail(email);
    }

    doFacebookSignup() {
        let provider = new auth.FacebookAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.authSignin(provider);
    }

    doGoogleSignup() {
        let provider = new auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.authSignin(provider);
    }

    authSignin(provider) {
        this.afAuth
            .signInWithPopup(provider)
            .then((res) => {
                this.ngZone.run(() => this.router.navigate(['home']));
                this.setUserData(res.user);
            })
            .catch((err) => window.alert(err));
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
        return userRef.set(this.userData, {
            merge: true,
        });
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null ? true : false;
    }

    doSignout() {
        this.afAuth.signOut();
        localStorage.setItem('user', '{}');
        this.router.navigate(['signin']);
    }
}
