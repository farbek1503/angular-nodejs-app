import { Component, OnInit } from '@angular/core';
import { CardService } from "../../services/card.service";
import { SettingsService } from "../../services/settings.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-more-card',
	templateUrl: './more-card.component.html',
	styleUrls: ['./more-card.component.css']
})
export class MoreCardComponent implements OnInit {
	
	title: string = '';
	description: string = '';
	image: string = '';
	author: string = '';
	createdDate: string = '';
	
	constructor(private cardService: CardService, private setService: SettingsService, private acRoute: ActivatedRoute, private titleService: Title) {}
	
	ngOnInit(): void {
		this.acRoute.params.subscribe(params => {
			const id = params['id'];
			const dataCard = this.cardService.moreCard(id)
			dataCard.forEach((item:any) => {
				this.title = item.data.title
				this.description = item.data.description
				this.image = item.data.image
				this.createdDate = item.data.user_id.createdAt
				this.titleService.setTitle(`More Card ${item.data.title}`);
				const token = this.setService.getUser(localStorage.getItem('token'))
				token.forEach((res:any) => {
					// this.author = item.data.user_id.email
					if(res.data.email == item.data.user_id.email){
						this.author = 'You'
						}else{
						this.author = item.data.user_id.email
					}
				})
			})
		});
	}
}
