import { Injectable } from '@angular/core';
import { AccountService } from './app/user/account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageSecurityService {

  constructor(private accountSrv: AccountService, private route: Router) { }

  hasAuthority(){
    if(typeof this.accountSrv.currentUsersData.id === 'undefined'){
        this.route.navigateByUrl('login');
    };
  }
}
