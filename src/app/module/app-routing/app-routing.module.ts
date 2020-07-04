import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from 'src/app/component/session/signin/signin.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/signin',
        pathMatch: 'full',
    },
    {
        path: 'signin',
        component: SigninComponent,
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
