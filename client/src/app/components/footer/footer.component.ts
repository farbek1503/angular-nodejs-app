import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	constructor(public translate: TranslateService) {
		translate.addLangs(['en', 'uz', 'ру']);
		translate.setDefaultLang('en');
		
		// const browserLang = translate.getBrowserLang();
		translate.use(localStorage.getItem('lang') || 'en');
	}
	
	ngOnInit(): void {
		if(!localStorage.getItem('lang')){
			localStorage.setItem('lang', 'en')
			}else {
			return
		}
	}
	
	changeLang(lang:any){
		localStorage.setItem('lang', lang)
		this.translate.use(localStorage.getItem('lang') || 'en')
	}
	
}
