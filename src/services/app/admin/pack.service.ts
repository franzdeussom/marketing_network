import { Endpoint } from './../api/endpoint.enum';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Alert } from '../alert.model';
import { AlertMessage } from '../alert.message';
import { Pack } from './pack.model';
import { Souscription } from './souscription.model';
import { AccountService } from '../user/account.service';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  public packToModify: any;
  listPack : Pack[] = [];
  myParentListPack: Souscription[] = [];
  myPacks : Souscription[] = [];
  waitingResponse: boolean = false;

  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();
  
  updatePPDone: boolean = false;

  precUserIdPackLoaded : number = 0;

  constructor(private api: ApiService, private accountSrv: AccountService) { }

  createNewPack(pack: Pack){
    this.waitingResponse = true;
      this.api.post(Endpoint.CREATE_PACK, pack).subscribe((data)=>{
          if(Object.keys(data).length > 0){
              this.waitingResponse = false;
              this.activeAlertSucess(AlertMessage.PACK_CREATED_SUCCESS);
            
          }
      }, (err)=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
      })
  }

  updatePp(img: any, dataImage: any){
    let id = JSON.parse(dataImage).id;
    
    this.waitingResponse = true;
    this.updatePPDone =false;

    this.api.put(Endpoint.UPDATE_PP_PACK+id, {'imgUrl' : img}).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
            this.waitingResponse = false;
            this.updatePPDone =true;
            this.updateOnMainList(img, id);
        }
    },()=>{
      this.activeAlertError(AlertMessage.ERROR);
      this.waitingResponse = false;
    })
  }

  updateOnMainList(img: any, id: number){
    const index = this.listPack.findIndex((pack)=> pack.id === id);

    if(index != -1){
        this.listPack[index].imgUrl = img;
        this.activeAlertSucess('Mise à jour effectue...');

    }

  }

  getAllPack(){
      this.waitingResponse = true;
      this.api.getWithRequestParam(Endpoint.LOAD_PACK+this.accountSrv.currentUsersData.parent_ID).subscribe((data: any)=>{
          this.waitingResponse = false;
          this.listPack = Array.from(data.listPack);
          this.myParentListPack = Array.from(data.myParentPacks);
      }, (err)=>{
            this.waitingResponse = false;
            this.activeAlertError(AlertMessage.ERROR);
      });
  }

  getMyPack(){
    this.waitingResponse = true;
    this.api.getWithRequestParam(Endpoint.LOAD_MY_PACK+this.accountSrv.currentUsersData.id).subscribe((data: any)=>{
        this.waitingResponse = false;
        this.myPacks = Array.from(data.myPacks)
    }, (err)=>{
          this.waitingResponse = false;
          this.activeAlertError(AlertMessage.ERROR);
    });
  }

  getUserPacks(id_user: number){
      this.waitingResponse = true;

      this.api.getWithRequestParam(Endpoint.LOAD_MY_PACK+id_user).subscribe((data: any)=>{
        this.waitingResponse = false;
        
        this.myPacks = Array.from(data.myPacks);
        this.precUserIdPackLoaded =  id_user;
    }, (err)=>{
          this.activeAlertError(AlertMessage.ERROR);
    });
  }

  getAllPackAdmin(){
    this.waitingResponse = true;
        this.api.getWithRequestParam(Endpoint.LOAD_PACK_ADMIN).subscribe((data: any)=>{
            this.waitingResponse = false;
            
            this.listPack = Array.from(data);
      }, (err)=>{
            this.waitingResponse = false;
            this.activeAlertError(AlertMessage.ERROR);
      });
  }

  isSuscribeAvailabe(id_pack: number): boolean{
    //check if the parent hat sucribed this pack
    let possible : boolean = false;

    const index = this.myParentListPack.findIndex((value: Souscription)=> value.id_pack == id_pack);
    if(index != -1){
        possible = true;
    }

    return possible;
  }

  hasAlreadySuscribed(idPack: number): boolean{
      let hasSuscribed = false;
      const index = this.myPacks.findIndex((sousc: Souscription)=> sousc.id_pack == idPack);
     
      if(index != -1){
          hasSuscribed = true;
      }

      return hasSuscribed;
  }


  updatePack(pack: Pack){
    this.waitingResponse = true;
      this.api.post(Endpoint.UPDATE_PACK, pack).subscribe((response: any)=>{
            if(Object.keys(response).length > 0){
                this.waitingResponse = false;
                
                this.activeAlertSucess(AlertMessage.UPDATE_SUCCESS);
            }
      }, ()=>{
            this.waitingResponse = false;
            this.activeAlertError(AlertMessage.ERROR);
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
      }, 5000);
    }

}
