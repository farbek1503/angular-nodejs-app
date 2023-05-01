import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isTheme: any
	
	ngOnInit(): void {
		if(!localStorage.getItem('theme')){
			localStorage.setItem('theme', 'light')
		}
		const theme = localStorage.getItem('theme')
		this.isTheme = theme
	}
}
