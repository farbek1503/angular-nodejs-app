import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class ToastrAlertService {
	
	constructor(private toastr: ToastrService) { }
	
	success(desc:any){
		this.toastr.success(desc);
	}
	
	info(desc:any){
		this.toastr.info(desc);
	}
	
	warning(desc:any){
		this.toastr.warning(desc);
	}
	
	error(desc:any){
		this.toastr.error(desc);
	}
}
