import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { CreateCardComponent } from './components/create-card/create-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { MoreCardComponent } from './components/more-card/more-card.component';

import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guard/auth.guard';
import { IsAuthGuard } from './guard/is-auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	
	{ path: 'login', component: LoginComponent, canActivate: [IsAuthGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [IsAuthGuard] },
	
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	
	{ path: 'create-card', component: CreateCardComponent, canActivate: [AuthGuard] },
	{ path: 'edit-card/:id', component: EditCardComponent, canActivate: [AuthGuard] },
	{ path: 'more-card/:id', component: MoreCardComponent, canActivate: [AuthGuard] },
	
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	
	{ path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
