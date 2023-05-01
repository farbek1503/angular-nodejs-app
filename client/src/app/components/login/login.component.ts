import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ToastrAlertService } from "../../services/toastr.service";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
	verticalPosition: MatSnackBarVerticalPosition = 'top';
	
	LoginForm: FormGroup;
	
	constructor(private authService: AuthService, private _snackBar: MatSnackBar, private route: Router, private toastr: ToastrAlertService, private titleService: Title, private translateService: TranslateService) {
		this.LoginForm = new FormGroup({
			email: new FormControl("", [Validators.email, Validators.required]),
			password: new FormControl("", [Validators.required]),
		});
	}
	
	ngOnInit(): void {
		this.titleService.setTitle('Login Page');
	}
	
	openSnackBar(data:any) {
		this._snackBar.open(data, 'Close', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
	
	loginSubmit(){
		const allRequire = this.translateService.instant('alerts.allRequire');
		const userNotFound = this.translateService.instant('alerts.login.userNotFound');
		const passwordWrong = this.translateService.instant('alerts.login.passwordWrong');
		const successText = this.translateService.instant('alerts.login.success');
		const serverError = this.translateService.instant('alerts.serverError');
		
		if (this.LoginForm.valid) {
			this.authService.login(this.LoginForm.value).subscribe(
				(res:any) => {
					if(res.data === 'User Not Found'){
						this.openSnackBar(userNotFound)
						return
					}else if (res.data === 'Password Wrong'){
						this.openSnackBar(passwordWrong)
						return
					}else{
						this.toastr.success(successText)
						localStorage.setItem('token', res.token)
						this.LoginForm.reset()
						this.route.navigate(['/home'])
					}
				},
				err => {
					this.toastr.error(serverError)
				}
			);
			}else{
			this.openSnackBar(allRequire)
		}
	}
}
