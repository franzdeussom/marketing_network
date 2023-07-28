import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { Pack } from 'src/services/app/admin/pack.model';
import { PackService } from 'src/services/app/admin/pack.service';
import { AlertMessage } from 'src/services/app/alert.message';

@Component({
  selector: 'app-update-pack',
  templateUrl: './update-pack.component.html',
  styleUrls: ['./update-pack.component.scss']
})
export class UpdatePackComponent {
  packToUpdate : Pack = new Pack();
  formUpdateControl!: FormGroup;
  imgChoose: any;
  ext: any;
   constructor(public packService : PackService,
              public accountAdminSrv: AdminAccountService,
              private fb: FormBuilder,
              private route: Router,
              
              ){ this.hasAuthority(); this.createFormControl()}

  hasAuthority(){
      if(typeof this.accountAdminSrv.currentAdminData.id === 'undefined'){
            this.route.navigateByUrl('admin/login');
      }
  }

  createFormControl(){
    Object.assign(this.packToUpdate, this.packService.packToModify);

    this.formUpdateControl = this.fb.group({
        intitule: ['', Validators.required],
        prix: ['', Validators.required],
        description: ['', Validators.required],
        description_globale: ['', Validators.required],
        pourcentage: ['', Validators.required],
        pourcentageReduction: ['', Validators.required]
    });
    
      this.initForm();

    this.formUpdateControl.valueChanges.subscribe((data)=>{
        this.setData(data);
    })
  }

  initForm(){
    this.formUpdateControl.controls['intitule'].setValue(this.packToUpdate.intitule);
    this.formUpdateControl.controls['prix'].setValue(this.packToUpdate.prix);
    this.formUpdateControl.controls['description'].setValue(this.packToUpdate.description);
    this.formUpdateControl.controls['description_globale'].setValue(this.packToUpdate.description_globale);
    this.formUpdateControl.controls['pourcentage'].setValue(this.packToUpdate.pourcentage);
    this.formUpdateControl.controls['pourcentageReduction'].setValue(this.packToUpdate.pourcentageReduction);
    
  }

  update(){
    this.scrollToTop();

    if(this.isFormDataSet()){
      if(this.packToUpdate.pourcentage <= 100 && this.packToUpdate.pourcentage > 0){
        if(this.packToUpdate.pourcentageReduction > 0){
          if(this.packToUpdate.pourcentage > this.packToUpdate.pourcentageReduction){
            if(this.packToUpdate.prix > 0){

              this.packService.updatePack(this.packToUpdate);

            }else{
              this.packService.activeAlertError('Le prix ne peut etre negatif');
            }        
          }else{
             this.packService.activeAlertError('Le pourcentage de reduction ne peut etre supperieur ou egal au Pourcentage de gain')
          }          }

        }else{
            this.packService.activeAlertError('Veuillez reverifier le pourcentage de reduction pour ce Pack');
        }
      }else{
        this.packService.activeAlertError('Veuillez reverifier le pourcentage pour ce Pack');
      }
    }else{
      this.packService.activeAlertError(AlertMessage.ERROR_EMPTY_FIELD);
    }
  }

  isFormDataSet(): boolean{
      return this.formUpdateControl.valid;
  }

  reset(){
      this.formUpdateControl.reset();
  }

  setData(data: any){
      Object.assign(this.packToUpdate, data);
  }

  
  

  scrollToTop(){
      window.scrollTo(0,0);
  }
}
