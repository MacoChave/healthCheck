import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatRippleModule,
        MatTableModule,
        MatDialogModule,
        MatSlideToggleModule,
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatRippleModule,
        MatTableModule,
        MatDialogModule,
        MatSlideToggleModule,
    ],
})
export class MaterialModule {}
