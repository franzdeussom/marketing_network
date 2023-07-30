import { Injectable } from '@angular/core';
import { Souscription } from './souscription.model';
import { ApiService } from '../api/api.service';
import { Endpoint } from '../api/endpoint.enum';
import { Alert } from '../alert.model';
import { AccountService } from '../user/account.service';
import { AlertMessage } from '../alert.message';
import { AdminAccountService } from './admin-account.service';

@Injectable({
  providedIn: 'root'
})
export class SouscriptionService {
  public listSouscriptionRequest: Souscription[] = [];

  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();
  waitingResponse: boolean = false;

  constructor(private api: ApiService, 
              private accountSrv: AccountService,
              private accountAdmin: AdminAccountService
              ) { }

  loadListSouscriptionRequest(){
    this.waitingResponse = true;
      this.api.get(Endpoint.LOAD_LIST_SOUSCR_REQUEST).subscribe((resp: any)=>{
            if(resp.length > 0){
                this.waitingResponse = false;
                this.listSouscriptionRequest = Array.from(resp);
            }
      }, ()=>{
        this.waitingResponse = false;

      });
  }

  createSuscriptionRequest(id: number){
        this.waitingResponse = true;

        this.api.get(Endpoint.SOUSCRIPTION_REQUEST+id+'/'+this.accountSrv.currentUsersData.id).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
                this.waitingResponse = false;
                this.activeAlertSucess(AlertMessage.SOUSCRIPTION_SUCCESS)
            };
        }, ()=>{
            this.waitingResponse = false;
            this.activeAlertError(AlertMessage.ERROR);
        })
  }

  searchInSouscriptionList(searchValue: string): Souscription[]{
      const exec =(souscription: Souscription)=>{
        return souscription.intitule.toString().substring(0, searchValue.length).toLowerCase() === searchValue.toLowerCase() 
                || souscription.username.toString().substring(0, searchValue.length).toLowerCase() === searchValue.toLowerCase()
                || souscription.surname.toString().substring(0, searchValue.length).toLowerCase() === searchValue.toLowerCase();  
      }

      return this.listSouscriptionRequest.filter(exec);
  }

  //admin method
  deleteRequest(id_souscription: number){
    this.waitingResponse = true;

      this.api.get(Endpoint.DELETE_SOUSCRITPION_REQUEST+id_souscription).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
                
                this.removeOnList(id_souscription);
                this.waitingResponse = false;
                this.activeAlertSucess(AlertMessage.DELETE);
            }
      }, ()=>{
        this.waitingResponse = false;

          this.activeAlertError(AlertMessage.ERROR);
      });
  }

  //admin method
  approuve(id_souscription: number, id_user: number){
    this.waitingResponse = true;
      this.api.get(Endpoint.APPROUVE_SOUSCRIPTION+id_souscription+'/'+id_user+'/'+this.accountAdmin.currentAdminData.id).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){

                this.removeOnList(id_souscription);
                this.waitingResponse = false;
                this.activeAlertSucess('Demande approuvée avec Succès.')
            }
      }, ()=>{
        this.waitingResponse = false;

          this.activeAlertError(AlertMessage.ERROR);
      });
  }

  async removeOnList(id: number){
      const index = this.listSouscriptionRequest.findIndex((sousc: Souscription)=> sousc.id == id);
      
      if(index != -1){
          this.listSouscriptionRequest.splice(index, 1);
      }
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
      }, 5500);
    }

}
 