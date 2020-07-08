import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import {
    BloodPressure,
    Glucose,
    Temperature,
    Weight,
} from 'src/app/models/health';

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    private user: User;
    private itemDoc: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore) {}

    setHealth(data: any, health: string) {
        this.user = JSON.parse(localStorage.getItem('user'));
        const healthRef: AngularFirestoreDocument<any> = this.afs.doc(
            `health/${this.user.uid}`
        );
        const typeHealthCol: AngularFirestoreCollection<any> = healthRef.collection(
            health
        );
        typeHealthCol
            .add(data)
            .then((res) => console.log(res))
            .catch((err) => console.error(Error));
    }

    getHealth(health: string) {
        this.user = JSON.parse(localStorage.getItem('user'));
        const healthRef: AngularFirestoreDocument<any> = this.afs.doc(
            `health/${this.user.uid}`
        );
        return healthRef.collection(health).valueChanges();
    }
}
