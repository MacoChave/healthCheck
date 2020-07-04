import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    pass = new FormControl('', Validators.required);
    hidePass: boolean = true;

    constructor() {}

    ngOnInit(): void {}

    signin() {
        console.log({
            email: this.email.value,
            password: this.pass.value,
        });
    }

    facebookAuth() {
        console.log('Iniciar sesión por Facebook');
    }

    googleAuth() {
        console.log('Iniciar sesión por Google');
    }
}
