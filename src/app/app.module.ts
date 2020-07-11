import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './module/material/material.module';
import { AppRoutingModule } from './module/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './component/session/signin/signin.component';
import { HomeComponent } from './component/dashboard/home/home.component';
import { SignupComponent } from './component/session/signup/signup.component';
import {
    GlucoseComponent,
    DialogGlucose,
} from './component/dashboard/glucose/glucose.component';

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        HomeComponent,
        SignupComponent,
        GlucoseComponent,
        DialogGlucose,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        ChartsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [DialogGlucose],
})
export class AppModule {}
