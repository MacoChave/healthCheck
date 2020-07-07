import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    pass = new FormControl('', Validators.required);
    hidePass: boolean = true;

    constructor(public authService: AuthService, public router: Router) {}

    ngOnInit(): void {
        // if (localStorage.getItem('user')) this.router.navigate(['home']);
        // TODO: VALIDAR SESIÓN ACTIVA
    }

    signin() {
        console.log({ email: this.email, pass: this.pass });
        this.authService
            .doAccess(this.email.value, this.pass.value)
            .then((res) => this.router.navigate(['home']))
            .catch((err) => console.error(err));
    }

    facebookAuth() {
        this.authService
            .doFacebookSignup()
            .then((res) => {
                this.router.navigate(['home']);
            })
            .catch((err) => console.error(err));
    }

    googleAuth() {
        this.authService
            .doGoogleSignup()
            .then((res) => {
                this.router.navigate(['home']);
            })
            .catch((err) => console.error(err));
    }

    recoveryPassword() {
        this.authService.forgotPassword(this.email.value);
    }
}
