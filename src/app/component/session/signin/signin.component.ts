import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    pass = new FormControl('', Validators.required);
    hidePass: boolean = true;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {}

    signin() {
        this.authService
            .doRegister(this.email.value, this.pass.value)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }

    facebookAuth() {
        this.authService
            .doFacebookSignup()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }

    googleAuth() {
        this.authService
            .doGoogleSignup()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }
}
