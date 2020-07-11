import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { SigninComponent } from 'src/app/component/session/signin/signin.component';
import { HomeComponent } from 'src/app/component/dashboard/home/home.component';
import { SignupComponent } from 'src/app/component/session/signup/signup.component';
import { GlucoseComponent } from 'src/app/component/dashboard/glucose/glucose.component';

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
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'glucose',
        component: GlucoseComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
