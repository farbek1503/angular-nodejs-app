import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
	constructor(private route: Router) {}
	
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!localStorage.getItem('token')) {
			return true;
		} else {
			this.route.navigate(['/home'])
			return false;
		}
	}
	
}
