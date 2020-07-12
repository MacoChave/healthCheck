import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    @HostBinding('class') mainCssClass;

    title = 'healthCheck';
    darkTheme: boolean = false;

    constructor(
        public overlayContainer: OverlayContainer,
        public authService: AuthService,
        public router: Router
    ) {}

    ngOnInit() {
        this.darkTheme = JSON.parse(localStorage.getItem('darkTheme'));
        this.setTheme();
    }

    changeTheme() {
        // this.darkTheme = !this.darkTheme;
        localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme));
        this.setTheme();
    }

    setTheme() {
        this.darkTheme
            ? this.onSetTheme('darkTheme')
            : this.onSetTheme('lightTheme');
    }

    onSetTheme(theme: string) {
        // this.overlayContainer.getContainerElement().classList.add(theme);
        this.mainCssClass = theme;
    }

    signout() {
        this.authService.doSignout();
        // this.router.navigate(['']);
    }
}
