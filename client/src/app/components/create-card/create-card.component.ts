import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CardService } from "../../services/card.service";
import { Router } from '@angular/router';
import { ToastrAlertService } from "../../services/toastr.service";
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
	selector: 'app-create-card',
	templateUrl: './create-card.component.html',
	styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';
	
	CreateCardForm: FormGroup;
	
	constructor(private cardService: CardService, private _snackBar: MatSnackBar, private route: Router, private toastr: ToastrAlertService, private titleService: Title, private translateService: TranslateService) {
		this.CreateCardForm = new FormGroup({
			title: new FormControl("", [Validators.required]),
			description: new FormControl("", [Validators.required]),
			image: new FormControl("", [Validators.required]),
		});
	}
	
	ngOnInit(): void {
		this.titleService.setTitle('Create Card');
	}
	
	openSnackBar(data:any) {
		this._snackBar.open(data, 'Close', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
	
	createCard(){
	
		const allRequire = this.translateService.instant('alerts.allRequire');
		const successText = this.translateService.instant('alerts.createCard.success');
		const serverError = this.translateService.instant('alerts.serverError');
	
		if (this.CreateCardForm.valid) {
			this.cardService.createCard(this.CreateCardForm.value, localStorage.getItem('token')).subscribe(
				(res:any) => {
					this.toastr.success(successText)
					window.location.reload();
					this.route.navigate(['/home'])
				},
				err => {
					this.toastr.error(serverError)
				}
			);
		}else {
			this.openSnackBar(allRequire)
		}
	}
	
}
