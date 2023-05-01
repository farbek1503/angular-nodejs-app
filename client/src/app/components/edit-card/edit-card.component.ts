import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CardService } from "../../services/card.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrAlertService } from "../../services/toastr.service";
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
	selector: 'app-edit-card',
	templateUrl: './edit-card.component.html',
	styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';
	
	EditCardForm: FormGroup;
	userID:string = '';
	
	title:string = '';
	description:string = '';
	image:string = '';
	
	constructor(private cardService: CardService, private acRoute: ActivatedRoute, private route: Router, private _snackBar: MatSnackBar, private toastr: ToastrAlertService, private titleService: Title, private translateService: TranslateService) {
		this.EditCardForm = new FormGroup({
			title: new FormControl("", [Validators.required]),
			description: new FormControl("", [Validators.required]),
			image: new FormControl("", [Validators.required]),
		});
	}
	
	ngOnInit(): void {
		this.acRoute.params.subscribe(params => {
			const id = params['id'];
			const dataDef = this.cardService.getEditCard(id)
			dataDef.forEach((item:any) => {
				this.cardService.getCards(localStorage.getItem('token'))
				.subscribe((res:any) => {
					if(res.tokenId == item.defaultData.user_id){
						this.title = item.defaultData.title
						this.description = item.defaultData.description
						this.image = item.defaultData.image
						this.titleService.setTitle(`Edit Card ${item.defaultData.title}`);
						}else{
						this.route.navigate(['/home'])
					}
				})
			})
		});
	}
	
	openSnackBar(data:any) {
		this._snackBar.open(data, 'Close', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
	
	editCard(){
	
		const successText = this.translateService.instant('alerts.editCard.success');
		const serverError = this.translateService.instant('alerts.serverError');
	
		if (this.EditCardForm.valid) {
			this.acRoute.params.subscribe(params => {
				const id = params['id'];
				this.userID = id
			});
			this.cardService.editCard(this.userID, this.EditCardForm.value, localStorage.getItem('token')).subscribe(
				(res:any) => {
					this.toastr.success(successText)
					// window.location.reload();
					this.route.navigate(['/more-card', res.data._id])
				},
				err => {
					this.toastr.error(serverError);
				}
			);
		}
	}
	
}	