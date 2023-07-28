import { Injectable } from '@angular/core';
import { Administrator } from './admin.model';
import { Pack } from './pack.model';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Endpoint } from '../api/endpoint.enum';
import { Alert } from '../alert.model';
import { AlertMessage } from '../alert.message';
import { AccountService } from '../user/account.service';
import { UserSuscribed } from './souscriptionListUser.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountService {
  currentAdminData: Administrator = new Administrator();
  isAdminAuthentificated: boolean = false;

  listUser : User[] = [];

  listUserSuscribed: UserSuscribed[] = [];

  waitingResponse: boolean = false;
  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();
  
  constructor(private api: ApiService, private route : Router) { }

  login(credentials: {email: string, password: string}){
      this.waitingResponse = true;
      this.api.post(Endpoint.ADMIN_LOGIN, credentials).subscribe((data: any)=>{
            if(data.length > 0){
                this.waitingResponse = false;
                Object.assign(this.currentAdminData, data[0]);
                this.isAdminAuthentificated = true;
                localStorage.setItem('appAdminToken', this.currentAdminData.token);
                this.route.navigateByUrl('admin/home');
            }else{
              this.waitingResponse = false;
              
              this.activeAlertError(AlertMessage.LOGIN_ERROR);
            }
      }, ()=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
      });
  } 

  updateAccount(data: any){
    
      this.waitingResponse = true;

      this.api.post(Endpoint.UPDATE_ADMIN_ACCOUNT, JSON.parse(data)).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
              this.waitingResponse = false;
              Object.assign(this.currentAdminData, JSON.parse(data));
              this.activeAlertSucess(AlertMessage.UPDATE_SUCCESS);
          }
      }, ()=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
      })
  }

  loadListUser(){
      this.waitingResponse = true;

      this.api.get(Endpoint.LIST_USER).subscribe((resp: any)=>{
              this.waitingResponse = false;
              this.listUser = Array.from(resp.listSimple);
              this.listUserSuscribed = Array.from(resp.listUserWhoSuscribed);
      }, ()=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
      });
  }

  search(searchValue: string): UserSuscribed[]{
      const exec =(user: UserSuscribed)=>{

        return user.surname.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase() || user.username.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase();
      }

      return this.listUserSuscribed.filter(exec);
  }
  deletePack(id: number){

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
