import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    @HostBinding('class') mainCssClass = 'lightTheme';

    title = 'healthCheck';
    darkTheme: boolean = false;

    constructor(public overlayContainer: OverlayContainer) {}

    ngOnInit() {
        this.darkTheme = JSON.parse(localStorage.getItem('darkTheme'));
        this.setTheme();
    }

    changeTheme() {
        this.darkTheme = !this.darkTheme;
        localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme));
        this.setTheme();
    }

    setTheme() {
        this.darkTheme
            ? this.onSetTheme('darkTheme')
            : this.onSetTheme('lightTheme');
    }

    onSetTheme(theme: string) {
        this.overlayContainer.getContainerElement().classList.add(theme);
        this.mainCssClass = theme;
    }
}
