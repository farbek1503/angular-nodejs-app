import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	constructor(private http: HttpClient) { }
	
	baseURL:string = 'https://angular-nodejs-server.vercel.app';
	
	register(userData:any){
		return this.http.post(`${this.baseURL}/auth/register`, userData)
	}
	
	login(userData:any){
		return this.http.post(`${this.baseURL}/auth/login`, userData)
	}
}
