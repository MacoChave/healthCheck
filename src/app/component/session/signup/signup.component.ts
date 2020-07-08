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

    ngOnInit(): void {
        if (this.authService.isLoggedIn === true)
            this.router.navigate(['home']);
    }

    signup() {
        if (!this.email.errors && !this.pass.errors) {
            console.log({
                email: this.email.value,
                emailField: this.email,
                pass: this.pass.value,
                passField: this.pass,
            });
            this.authService.doRegister(this.email.value, this.pass.value);
        }
    }

    googleAuth() {
        this.authService.doGoogleSignup();
    }

    facebookAuth() {
        this.authService.doFacebookSignup();
    }
}
