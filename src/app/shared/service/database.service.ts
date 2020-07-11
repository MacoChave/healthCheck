import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
    DocumentReference,
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

    constructor(private afs: AngularFirestore) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    setHealth(data: any, health: string) {
        return new Promise<DocumentReference>((resolve, reject) => {
            this.afs.collection(`/health/${this.user.uid}/${health}`).add(data);
        });
    }

    getHealth(health: string) {
        return this.afs
            .collection(`/health/${this.user.uid}/${health}`)
            .valueChanges();
    }
}
