import { Injectable } from '@angular/core';
import { Generation } from './generation.model';
import { AccountService } from '../user/account.service';
import { ApiService } from '../api/api.service';
import { Endpoint } from '../api/endpoint.enum';
import { Alert } from '../alert.model';
import { AlertMessage } from '../alert.message';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {
  firstGeneration: Generation[] = [];
  secondGeneration: Generation[] = [];
  thirdGeneration: Generation[] = [];

  firstGenerationGain : number = 0;
  secondGenerationGain: number = 0;
  thirdGenerationGain: number = 0;
  gainTotal: number = 0;

  lastPackIdLoaded : number = 0;
  tranSitUser: any;//user to transit user info to list pack user;

  waitingResponse: boolean = false;
  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();
  
  constructor(private accountSrv: AccountService, 
              private api: ApiService
              ) { }

  loadGeneration(id_pack: number){
    this.waitingResponse = true;

      this.api.get(Endpoint.MY_GENERATION+this.accountSrv.currentUsersData.id+'/'+id_pack)
      .subscribe((resp: any)=>{
          this.waitingResponse = false;
          this.firstGeneration = Array.from(resp.firstGeneration);
          this.secondGeneration = Array.from(resp.secondGeneration);
          this.thirdGeneration = Array.from(resp.thirdGeneration);
          this.lastPackIdLoaded = id_pack;
          this.buildGain();
      },()=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
      });
  }

  renitList(){
    this.firstGeneration = [];
    this.secondGeneration = [];
    this.thirdGeneration = [];
  }

  async buildGain(){
     this.renitGain();

      this.firstGeneration.forEach((user: Generation)=>{
            if(user.id_user != this.accountSrv.currentUsersData.id){
                 this.firstGenerationGain = this.firstGenerationGain + Math.floor(Number.parseInt(user.gainOnUser));
            }
      });

      this.secondGeneration.forEach((user: Generation)=>{
            if(user.id_user != this.accountSrv.currentUsersData.id){
                 this.secondGenerationGain = this.secondGenerationGain + Math.floor(Number.parseInt(user.gainOnUser));
            }
      });

      this.thirdGeneration.forEach((user: Generation)=>{
            if(user.id_user != this.accountSrv.currentUsersData.id){
                 this.thirdGenerationGain = this.thirdGenerationGain + Math.floor(Number.parseInt(user.gainOnUser));
            }
      });

      this.gainTotal = this.gainTotal + this.firstGenerationGain + this.secondGenerationGain + this.thirdGenerationGain;
  }

  renitGain(){
    this.firstGenerationGain = 0;
    this.secondGenerationGain = 0;
    this.thirdGenerationGain = 0;
    this.gainTotal = 0; 
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
