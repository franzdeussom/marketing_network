import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PackService } from 'src/services/app/admin/pack.service';
import { PageSecurityService } from 'src/services/page-security.service';
import { Pack } from 'src/services/app/admin/pack.model';
import { SouscriptionService } from 'src/services/app/admin/souscription.service';
import { AlertMessage } from 'src/services/app/alert.message';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})

export class UserHomeComponent {
  showSpinner : boolean = true;
  textConfirmation: string = '';
  idPackChoose: number = 0;

  constructor(public pageSecurity: PageSecurityService, private route: Router,
              public packService: PackService,
              public souscriptionSrv: SouscriptionService,
              private ngBmodal: NgbModal
              ){
      this.hasAuthority();
      this.loadPacks(); 
  }
  
  hasAuthority(){
    this.pageSecurity.hasAuthority();
  }

  loadPacks(){
    if(this.packService.listPack.length == 0){
        this.packService.getAllPack();
        setTimeout(()=>{
            if(this.packService.listPack.length == 0){
                this.showSpinner = false;
            }  
        }, 4500)
    }
  }

  openeModal(content: any, pack: Pack){
    this.textConfirmation = pack.description_globale;
    this.idPackChoose = pack.id;
    this.ngBmodal.open(content);
  }

  closeModal(){
    this.textConfirmation = '';
    this.idPackChoose = 0;
    this.ngBmodal.dismissAll();
  }

  doSuscription(){
    this.srollTop();
      if(this.idPackChoose != 0){
        //check if the parent suscribed on this pack
        if(this.packService.isSuscribeAvailabe(this.idPackChoose)){
          if(this.packService.myPacks.length > 0){
            //check if thie user suscribed already on this pack
            if(!this.packService.hasAlreadySuscribed(this.idPackChoose)){
                  this.souscriptionSrv.createSuscriptionRequest(this.idPackChoose);
            }else{
                this.souscriptionSrv.activeAlertError('Echec:  Vous avez deja une souscription en cours sur ce pack');
            } 
          }else{
            this.souscriptionSrv.createSuscriptionRequest(this.idPackChoose);
          }
        }else{
          this.souscriptionSrv.activeAlertError(AlertMessage.PACK_UNAVAILABLE);
        }
      }else{
          this.souscriptionSrv.activeAlertError('Une erreur interne est survenue lors de votre souscription...')
      }
      this.closeModal();
  }

  srollTop(){
    window.scrollTo(0,0);
  }
}

