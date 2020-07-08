import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatRippleModule,
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatRippleModule,
    ],
})
export class MaterialModule {}
