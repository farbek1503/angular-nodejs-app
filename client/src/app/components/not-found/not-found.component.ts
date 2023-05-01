import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
	
	constructor() { }
	
	isToken:any
	
	ngOnInit(): void {
		const token = localStorage.getItem('token')
		
		if(token){
			this.isToken = true
			}else {
			this.isToken = false
		}
	}
	
}
