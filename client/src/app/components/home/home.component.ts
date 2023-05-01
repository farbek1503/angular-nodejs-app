import { Component, OnInit } from '@angular/core';
import { CardService } from "../../services/card.service";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrAlertService } from "../../services/toastr.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	// styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	cards: any[];
	isToken: any
	
	constructor(private cardService: CardService, private route: Router, private toastr: ToastrAlertService, private titleService: Title, private translateService: TranslateService) {
		this.cards = [];
	}
	
	ngOnInit(): void {
		this.cardService.getCards(localStorage.getItem('token'))
		.subscribe(
			(res:any) => {
				this.cards = res.data
				this.isToken = res.tokenId
			}
		)
		
		this.titleService.setTitle('Home Page');
	}
	
	editCard(id:any){
		this.cardService.getCards(localStorage.getItem('token'))
		.subscribe(
			(res:any) => {
				const cardId = this.cardService.getEditCard(id)
				cardId.forEach((item:any) => {
					if(item.defaultData.user_id == res.tokenId){
						this.route.navigate(['/edit-card', id])
						}else{
						this.route.navigate(['/home'])
					}
				})
			}
		)
	}
	
	deleteCard(id:any){
		const deleteCard = this.translateService.instant('alerts.delete');
		if(confirm(deleteCard) == true){
			this.cardService.deleteCard(id)
			.subscribe((res:any) => {
				window.location.reload();
			})
			}else{
			return
		}
	}
	
	moreCard(id:any){
		this.route.navigate(['/more-card', id])
	}
	
}
