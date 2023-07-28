import { Component } from '@angular/core';
import { FormationService } from 'src/services/app/admin/formation.service';
import { PageSecurityService } from 'src/services/page-security.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent {
    constructor(
        public formationService: FormationService,
        private pageSecurity: PageSecurityService
    ){ this.hasAuthority(); this.getText(); }

  hasAuthority(){
    this.pageSecurity.hasAuthority();
  }
  getText(){
    if(this.formationService.formation.length == 0){
        this.formationService.getFormation();
    }
  }
  
}
