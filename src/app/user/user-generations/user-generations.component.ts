import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenerationService } from 'src/services/app/admin/generation.service';
import { Pack } from 'src/services/app/admin/pack.model';
import { PackService } from 'src/services/app/admin/pack.service';
import { AccountService } from 'src/services/app/user/account.service';
import { PageSecurityService } from 'src/services/page-security.service';

@Component({
  selector: 'app-user-generations',
  templateUrl: './user-generations.component.html',
  styleUrls: ['./user-generations.component.scss']
})
export class UserGenerationsComponent {

  constructor(public accountSrv : AccountService, 
              private route : Router,
              public packServe: PackService,
              private generationSrv: GenerationService,
              private securityPage : PageSecurityService){
    this.hasAuthority();
    this.loadMyPack();
  }

  hasAuthority(){
    this.securityPage.hasAuthority();
  }

  loadMyPack(){
    if(this.packServe.myPacks.length == 0){
        this.packServe.getMyPack();
    }
  }

  goToFormPage(){
      this.route.navigateByUrl('generate-user')
  }

  goToGeneration(id_pack: any){
      this.checkAndLoadGeneration(id_pack);
      this.route.navigateByUrl('my-generation/list');
  }

  async checkAndLoadGeneration(idpack: number){
     if(this.generationSrv.lastPackIdLoaded != idpack){
          this.generationSrv.renitList();
          this.generationSrv.loadGeneration(idpack);
      }
  }

}
