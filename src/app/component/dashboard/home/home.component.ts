import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DatabaseService } from 'src/app/shared/service/database.service';
import { Router } from '@angular/router';
import { Glucose } from 'src/app/models/health';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(
        public authService: AuthService,
        public dbService: DatabaseService
    ) {}

    ngOnInit(): void {}
}
