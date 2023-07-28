import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { GenerationService } from 'src/services/app/admin/generation.service';
import { PackService } from 'src/services/app/admin/pack.service';
import { UserSuscribed } from 'src/services/app/admin/souscriptionListUser.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  listRsltSearch: UserSuscribed[] = [];
  searchValue: string = '';

  constructor(public adminAccount: AdminAccountService,
              public packService: PackService ,
              public generationSrv: GenerationService,
              public route: Router
              ){
      this.hasAuthority();
      this.loadListUser();
  }

  hasAuthority(){
      if(typeof this.adminAccount.currentAdminData.id === 'undefined'){
          throw new Error();
      }
  }
  
  loadListUser(){
      if(this.adminAccount.listUser.length == 0 && this.adminAccount.listUserSuscribed.length == 0){
          this.adminAccount.loadListUser();
      }
  }

  doSearch(){
      this.listRsltSearch = Array.from(this.adminAccount.search(this.searchValue));
  }

  goToPackUserList(id_user: any, user: any){
        this.loadUserPack(id_user, user);
        this.route.navigateByUrl('admin/list/pack/users');   
    }

  loadUserPack(id_user: number, user: any){
    this.packService.getUserPacks(id_user);
    
         localStorage.clear();
         localStorage.setItem('userSuscribed', JSON.stringify(user));    
  }
}
