import { Component } from '@angular/core';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { FormationService } from 'src/services/app/admin/formation.service';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.scss']
})
export class EditFormationComponent {

    constructor(
        public formationService: FormationService,
        public admin: AdminAccountService
    ){  this.hasAuthority();
        this.loadFormation();
        this.formationService.initForm();
    }

    hasAuthority(){
        if(!this.admin.currentAdminData.id){
            throw new Error('cant access this page');
        }
    }
  loadFormation(){
      if(this.formationService.formation.length == 0){
          this.formationService.getFormation();
      }
  }

  refresh(){
    this.formationService.getFormation();
  }

  updateDescription(){
      this.srollTop();
      this.formationService.updateOrPost();
  }

  postNewFormation(){

  }

  srollTop(){
    window.scrollTo(0,0);
  }
}
