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
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
	verticalPosition: MatSnackBarVerticalPosition = 'top';
	
	RegisterForm: FormGroup;
	
	constructor(private authService: AuthService, private _snackBar: MatSnackBar, private route: Router, private toastr: ToastrAlertService, private titleService: Title, private translateService: TranslateService) {
		this.RegisterForm = new FormGroup({
			firstName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
			lastName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
			gender: new FormControl("", [Validators.required]),
			brithday: new FormControl("", [Validators.required]),
			email: new FormControl("", [Validators.email, Validators.required]),
			password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
		});
	}
	
	ngOnInit(): void {
		this.titleService.setTitle('Register Page');
	}
	
	openSnackBar(data:any) {
		this._snackBar.open(data, 'Close', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
	
	registerSubmit() {
	
		const allRequire = this.translateService.instant('alerts.allRequire');
		const userExists = this.translateService.instant('alerts.register.userExists');
		const successText = this.translateService.instant('alerts.register.success');
		const serverError = this.translateService.instant('alerts.serverError');
		
		if (this.RegisterForm.valid) {
			this.authService.register(this.RegisterForm.value).subscribe(
				(res:any) => {
					if(res.data === 'This User Exists'){
						this.openSnackBar(userExists)
						return
					}
					this.toastr.success(successText)
					localStorage.setItem('token', res.token)
					this.RegisterForm.reset()
					this.route.navigate(['/home'])
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
