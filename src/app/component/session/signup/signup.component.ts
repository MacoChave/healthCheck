import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    pass = new FormControl('', Validators.required);
    hidePass: boolean = true;

    constructor(public authService: AuthService, public router: Router) {}

    ngOnInit(): void {}

    signup() {
        console.log({ email: this.email, pass: this.pass });
        this.authService
            .doRegister(this.email.value, this.pass.value)
            .then((res) => this.router.navigate(['home']))
            .catch((err) => console.error(err));
    }

    googleAuth() {
        this.authService
            .doGoogleSignup()
            .then((res) => this.router.navigate(['home']))
            .catch((err) => console.error(err));
    }

    facebookAuth() {
        this.authService
            .doFacebookSignup()
            .then((res) => this.router.navigate(['home']))
            .catch((err) => console.error(err));
    }
}
