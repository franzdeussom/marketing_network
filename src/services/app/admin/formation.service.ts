import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Formation } from './formation.model';
import { Endpoint } from '../api/endpoint.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAccountService } from './admin-account.service';
import { Alert } from '../alert.model';
import { AlertMessage } from '../alert.message';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  formation: Formation[] = [];
  description : string = '';
  waitingResponse : boolean = false;

  newUpdateValue: Formation = new Formation();
  formUpdate!: FormGroup;

  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();
  
  constructor(
      private api: ApiService,
      private fb: FormBuilder,
      private admin: AdminAccountService
  ) { }

  get f(){
    return this.formUpdate.controls
  }

  initForm(){
    this.formUpdate = this.fb.group({
        description: ['', Validators.required],
    });

    this.formUpdate.valueChanges.subscribe((data)=> {
        this.description = data.description;
    });    
  }

  getFormation(){
      this.waitingResponse = true;
      this.api.get(Endpoint.GET_FORMATION).subscribe((resp: any)=>{
          if(Array.isArray(resp)){
            this.formation = resp;
            this.formUpdate.controls['description'].setValue(this.formation[0].description);
          }
          this.waitingResponse = false;
        }, ()=>{

          this.waitingResponse = false;
        });
  }

  updateOrPost(){
      if(this.formation.length == 0){
          this.postNewFormation();
      }else{
          this.update();
      }
  }

 private update(){
      this.waitingResponse = true;
      Object.assign(this.newUpdateValue, this.formation[0]);
      this.newUpdateValue.description = this.description;
      this.api.put(Endpoint.UPDATE_FORMATION+this.newUpdateValue.id, this.newUpdateValue).subscribe((resp: any)=>{
          if(Object.keys(resp).length > 0){
            this.formation[0].lastUpdate_Date = resp.date;
            this.waitingResponse = false;
            this.activeAlertSucess(AlertMessage.UPDATE_SUCCESS);

          }
      }, ()=> {
        this.activeAlertError(AlertMessage.ERROR);
          this.waitingResponse = false;
      });
  }

 private postNewFormation(){
       this.waitingResponse  = true;

      this.newUpdateValue.lastUpdate_Date = new Date().getFullYear();
      this.newUpdateValue.id_admin = this.admin.currentAdminData.id;

      this.api.post(Endpoint.POST_FORMATION, this.newUpdateValue).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
            this.waitingResponse = false;

          }
      }, ()=> {
          this.activeAlertError(AlertMessage.ERROR);
          this.waitingResponse = false;
      });
  }

   activeAlertSucess(message: string){
        this.alert.successMessage = message;
        this.showAlertSucess = true;
        this.close();
    }

    activeAlertError(message: string){
        this.alert.errorMessage = message;
        this.showAlertError = true;
        this.close();
    }

    closeSuccessAlert(){
      this.showAlertSucess = false;
    }

    closeErrorAlert(){
      this.showAlertError = false;
    }

    close(){

      setTimeout(() => {
          this.closeSuccessAlert();
          this.closeErrorAlert()
      }, 2500);
    }
}
