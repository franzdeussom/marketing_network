import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { GenerationService } from 'src/services/app/admin/generation.service';
import { PackService } from 'src/services/app/admin/pack.service';
import { AccountService } from 'src/services/app/user/account.service';

@Component({
  selector: 'app-list-user-pack',
  templateUrl: './list-user-pack.component.html',
  styleUrls: ['./list-user-pack.component.scss']
})
export class ListUserPackComponent {

  constructor(public packServe: PackService, private adminAccount: AdminAccountService,
              private route: Router, private generationSrv: GenerationService,
              private accountUser: AccountService
              ){
        this.hasAuthority();
  }

  hasAuthority(){
      if(typeof this.adminAccount.currentAdminData.id === 'undefined'){
          throw new Error();
      }
  }

  ngOnDestroy() {
      this.packServe.listPack = [];
  }

  goToGeneration(id_pack: any){
    this.checkAndLoadGeneration(id_pack);
    this.route.navigateByUrl('admin/list/pack/users/generation');
  }

  async checkAndLoadGeneration(idpack: number){
    this.accountUser.currentUsersData.id = this.packServe.precUserIdPackLoaded;
    
         this.generationSrv.renitList();
         this.generationSrv.loadGeneration(idpack);
     }
} 
