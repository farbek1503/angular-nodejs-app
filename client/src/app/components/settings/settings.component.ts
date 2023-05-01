import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SettingsService } from "../../services/settings.service";
import { HomeComponent } from '../home/home.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	// styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	isCards: boolean = false;
	
	UserUpdateForm: FormGroup;
	PasswordForm: FormGroup;
	
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	
	cardData: any[]
	
	constructor(private setService: SettingsService, private homeCom: HomeComponent, private titleService: Title, private translateService: TranslateService) {
		this.UserUpdateForm = new FormGroup({
			firstName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
			lastName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
			email: new FormControl("", [Validators.email, Validators.required]),
		});
		
		this.PasswordForm = new FormGroup({
			oldPassword: new FormControl("", [Validators.required]),
			newPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
		})
		this.cardData = []
	}
	
	ngOnInit(): void {
		const data = this.setService.getUser(localStorage.getItem('token'))
		
		data.forEach((res:any) => {
			this.firstName = res.data.firstName
			this.lastName = res.data.lastName
			this.email = res.data.email
			
			const settingsTitle = this.translateService.instant('pageTitle.settings');
			this.titleService.setTitle(`Settings ${res.data.email}`);
		})
		this.getMyCard()
	}
	
	updateUserSubmit() {
		this.setService.editUser(this.UserUpdateForm.value, localStorage.getItem('token')).subscribe(
			(res:any) => {
				console.log('update data', res)
			},
			err => {
				console.log("We got an error in editUser...",err);
			}
		)
	}
	
	editPassword(){
		this.setService.editPassword(this.PasswordForm.value, localStorage.getItem('token')).subscribe(
			(res:any) => {
				console.log('password changes', res)
			},
			err => {
				console.log('Wrong Password Changes', err)
			}
		)
	}
	
	getMyCard(){
		this.setService.getMyCard(localStorage.getItem('token')).subscribe(
			(res:any) => {
				if(res.data.length !== 0){
					this.isCards = true
					this.cardData = res.data
				} else {
					this.isCards = false
				}
			},
			err => {
				console.log('my card err', err)
			}
		)
	}
	
	editMyCard(cardId:any){
		this.homeCom.editCard(cardId)
	}
	
	moreMyCard(cardId:any){
		this.homeCom.moreCard(cardId)
	}
	
	deleteMyCard(cardId:any){
		this.homeCom.deleteCard(cardId)
	}
	
	
}
