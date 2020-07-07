import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(public authService: AuthService, public router: Router) {}

    ngOnInit(): void {
        // if (localStorage.getItem('user')) this.router.navigate(['']);
        // TODO: VALIDAR SESION ACTIVA
    }

    signout() {
        this.authService.doSignout();
        this.router.navigate(['']);
    }
}
