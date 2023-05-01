import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CardService {
	
	constructor(private http: HttpClient) { }
	
	baseURL:string = 'https://angular-nodejs-server.vercel.app';
	
	getCards(token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get<any[]>(`${this.baseURL}/card/get-cards`, {headers})
	}
	
	createCard(card:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.post(`${this.baseURL}/card/create-card`, card, {headers})
	}
	
	editCard(id:any, editCard:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.post(`${this.baseURL}/card/edit-card/${id}`, editCard, {headers})
	}
	
	getEditCard(id:any){
		return this.http.get(`${this.baseURL}/card/edit-card/${id}`)
	}
	
	deleteCard(id:any){
		return this.http.post(`${this.baseURL}/card/delete-card/${id}`, id)
	}
	
	moreCard(id:any){
		return this.http.get(`${this.baseURL}/card/more-card/${id}`)
	}
}
