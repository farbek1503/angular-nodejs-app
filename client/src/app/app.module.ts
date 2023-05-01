import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { MoreCardComponent } from './components/more-card/more-card.component';
import { NavbarLinksComponent } from './components/navbar-links/navbar-links.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient);
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		NavbarComponent,
		CreateCardComponent,
		EditCardComponent,
		MoreCardComponent,
		NavbarLinksComponent,
		FooterComponent,
		SettingsComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			closeButton: true,
			timeOut: 3500,
			progressBar: true,
		}),
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
		MatMenuModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatIconModule,
		MatStepperModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSnackBarModule,
		MatTabsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [HomeComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
