import { Injectable } from '@angular/core';
import { User } from './user.model';
import { ApiService } from '../api/api.service';
import { Endpoint } from '../api/endpoint.enum';
import { Alert } from '../alert.model';
import { AlertMessage } from '../alert.message';
import { Router } from '@angular/router';
import { Role } from './role.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUsersData: User = new User();
  public isAuthentificated: boolean = false;
  public newUserLogin = '';
  public newUserPassword = '';
  public  showCredentialsNewUser : boolean = false;
  
  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert(); 
  waitingResponse: boolean = false;

  constructor(private api: ApiService, private router: Router) { }
   
   login(credentials: {email: string, password:string, sessionSaveEnabled: boolean}){
        this.waitingResponse = true;
        this.api.post(Endpoint.USER_LOGIN, credentials).subscribe((data: any)=>{
              if(data.length > 0){
                  Object.assign(this.currentUsersData, data[0]);
                  this.waitingResponse = false;
                  this.isAuthentificated = true;
                  this.saveData(credentials.sessionSaveEnabled);
                  this.checkSuscription();
                  
              }else{
                  this.waitingResponse = false;
                  this.activeAlertError(AlertMessage.LOGIN_ERROR);
              }
        },(err)=>{
            this.waitingResponse = false;
             console.log('err', err);
            this.activeAlertError(AlertMessage.ERROR);
        });

   }

   checkSuscription(){
      if(this.currentUsersData.hasSuscribed){
        this.router.navigateByUrl('my-packs');
      }else{
        this.router.navigateByUrl('home');
      }
   }

   clearSessionSave(){
      localStorage.removeItem('userData');
  }

   async saveData(isSessionSaveEnbled: boolean){
      localStorage.setItem('appUserToken', this.currentUsersData.token);
      if(isSessionSaveEnbled){
          localStorage.setItem('userData', JSON.stringify(this.currentUsersData));
      }
   } 

   checkLocalSessionSaved(): boolean{
      let dataUser = localStorage.getItem('userData');
      if(dataUser){
          Object.assign(this.currentUsersData, JSON.parse(dataUser));
          this.isAuthentificated = true;
          return true;
      }
      return false;
   }

   updtade(data: any){
      this.waitingResponse = true;

      this.api.post(Endpoint.UPDATE_ACCOUNT, JSON.parse(data)).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){

              Object.assign(this.currentUsersData, JSON.parse(data));
              this.waitingResponse = false;

              this.activeAlertSucess(AlertMessage.UPDATE_SUCCESS);
          }else{
            this.waitingResponse = false;

            this.activeAlertError(AlertMessage.ERROR + ' Modification impossible');
          }
      }, (err)=>{
        this.waitingResponse = false;

        this.activeAlertError(AlertMessage.ERROR);
      });
   }

   updatePp(blob: string, ext: string){
        const requestBody = {id: this.currentUsersData.id, profilImgUrl: blob, date: new Date().getFullYear(), extension: ext };
        this.waitingResponse = true;
        this.api.post(Endpoint.UPDATE_PP, requestBody).subscribe((response)=>{
            if(Object.keys(response).length > 0){
              this.currentUsersData.profilImgUrl = blob;
              this.waitingResponse = false;

            }
        }, (err)=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
        });
   }

   saveUserGenerate(user: User, email: string){
    this.waitingResponse = true;

        user.hasSuscribed = false;
        user.tmp_parent_ID = this.currentUsersData.id;
        user.parent_ID = this.currentUsersData.id;
        user.grandParent1_ID = (typeof this.currentUsersData.parent_ID == 'undefined' || this.currentUsersData.parent_ID == null) ? 0:this.currentUsersData.parent_ID;
        user.grandParent2_ID = (typeof this.currentUsersData.grandParent1_ID == 'undefined' || this.currentUsersData.grandParent1_ID == null) ? 0:this.currentUsersData.grandParent1_ID;

        if(user.grandParent1_ID == user.parent_ID){
          user.grandParent1_ID = 0;
        }
        
        user.role = Role.USER;
        user.profilImgUrl = null;
        user.password = this.generatePassword();
        this.api.post(Endpoint.SAVE_USER_GENERATE, user).subscribe((resp)=>{
              if(Object.keys(resp).length > 0){
                  this.newUserPassword = user.password;
                  this.newUserLogin = email;
                  this.showCredentialsNewUser = true;
                  this.waitingResponse = false;
                  this.activeAlertSucess(AlertMessage.NEW_USER_SUCCESSFUL_SAVE);
              }
        }, ()=>{
          this.waitingResponse = false;
            this.activeAlertError(AlertMessage.ERROR);
        })
   }

   generatePassword(): string{
        let caracter = 'aAbBcCdDEeFfGghHiIJjKklLmMnNoOpPQqRrSstTuUvVwWxXyYZz';
        let password = '';
        
        for(let i=0; i <= 15; i++){
            const pos = Math.floor(Math.random() * caracter.length);
            password = password + '' + caracter.charAt(pos);
        }
        
        return password;
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
