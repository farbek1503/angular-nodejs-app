import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	
	constructor(private http: HttpClient) { }
	
	baseURL:string = 'https://angular-nodejs-server.vercel.app';
	
	getUser(token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/profile/settings`, {headers})
	}
	
	editUser(editUser:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.post(`${this.baseURL}/profile/edit-user/`, editUser, {headers})
	}
	
	editPassword(editPass:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.post(`${this.baseURL}/profile/edit-password/`, editPass, {headers})
	}
	
	getMyCard(token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/profile/get-my-card/`, {headers})
	}
}
