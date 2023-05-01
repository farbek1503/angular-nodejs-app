import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from "../../services/settings.service";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	// styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	genderImg: any;
	
	constructor(private route: Router, private setService: SettingsService) {}
	
	ngOnInit(): void {
		const isGender = this.setService.getUser(localStorage.getItem('token'))
		isGender.forEach((res:any) => {
			if(res.data.gender == 'male'){
				this.genderImg = './assets/male.png'
				}else {
				this.genderImg = './assets/woman.png'
			}
		})
	}
	
	toggleTheme(){
		if(localStorage.getItem('theme') == 'light'){
			localStorage.setItem('theme', 'dark')
			}else{
			localStorage.setItem('theme', 'light')
		}
		window.location.reload();
	}
	
	logout(){
		localStorage.removeItem('token')
		this.route.navigate(['/login'])
	}
}
