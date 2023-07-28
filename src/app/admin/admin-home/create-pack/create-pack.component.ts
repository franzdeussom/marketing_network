import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { Pack } from 'src/services/app/admin/pack.model';
import { PackService } from 'src/services/app/admin/pack.service';
import { AlertMessage } from 'src/services/app/alert.message';

@Component({
  selector: 'app-create-pack',
  templateUrl: './create-pack.component.html',
  styleUrls: ['./create-pack.component.scss']
})
export class CreatePackComponent {
    formPackControl!: FormGroup;
    newPack: Pack = new Pack();

    constructor(public packService : PackService,
              public accountAdminSrv: AdminAccountService,
              private fb: FormBuilder,
              private route: Router

              ){ this.hasAuthority(); this.createFormControl()}

  hasAuthority(){
      if(typeof this.accountAdminSrv.currentAdminData.id === 'undefined'){
            this.route.navigateByUrl('admin/login');
      }
  }

  createFormControl(){
    this.formPackControl = this.fb.group({
          intitule: ['', Validators.required],
          description: ['', Validators.required],
          prix: ['', Validators.required],
          description_globale: ['', Validators.required],
          pourcentage: ['', Validators.required],
          pourcentageReduction: ['', Validators.required]
    });

    this.formPackControl.valueChanges.subscribe((data)=>{
        this.setData(data);
    })
  }

  setData(data: any){
    this.newPack.imgUrl = '../../../assets/packImg.jpg';
    this.newPack.created_by = this.accountAdminSrv.currentAdminData.id;
      Object.assign(this.newPack, data);
  }


  isFormDataSet(): boolean{
      return this.formPackControl.valid;
  }

  create(){
    this.scrollToTop();

    if(this.isFormDataSet()){
      if(this.newPack.pourcentage <= 100 && this.newPack.pourcentage > 0){
        if(this.newPack.pourcentageReduction > 0){
          if(this.newPack.pourcentage > this.newPack.pourcentageReduction){
            if(this.newPack.prix > 0){
              this.packService.createNewPack(this.newPack);
              this.reset()
            }else{
              this.packService.activeAlertError('Le prix ne peut etre negatif');
            }        
          }else{
             this.packService.activeAlertError('Le pourcentage de reduction ne peut etre supperieur ou egal au Pourcentage de gain')
          }
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
  
  reset(){
      this.formPackControl.reset();
  }

  scrollToTop(){
      window.scrollTo(0,0);
  }
}
